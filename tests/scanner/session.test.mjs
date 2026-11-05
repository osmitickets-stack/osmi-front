import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../../src/modules/scanner/session.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } });
const { ScannerSession } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const valid = { authentic: true, canCheckIn: true, result: "VALID", ticketCode: "TEST-1" };
const admitted = { accepted: true, result: "CHECKED_IN", ticketCode: "TEST-1" };
function deferred() { let resolve; const promise = new Promise(done => { resolve = done; }); return { promise, resolve }; }
function setup(overrides = {}) {
  let token = "test-session";
  const calls = { validate: 0, confirm: 0 };
  const session = new ScannerSession({
    validate: async (...args) => { calls.validate++; return overrides.validate ? overrides.validate(...args) : valid; },
    confirm: async (...args) => { calls.confirm++; return overrides.confirm ? overrides.confirm(...args) : admitted; },
  }, () => token, () => {});
  session.selectEvent("event-a");
  return { session, calls, setToken: value => { token = value; } };
}

test("validation never consumes; explicit confirmation is required", async () => {
  const { session, calls } = setup();
  await session.confirm(); assert.equal(calls.confirm, 0);
  await session.validate("test-qr");
  assert.equal(session.state.phase, "ready"); assert.equal(calls.confirm, 0);
  await session.confirm(); assert.equal(calls.confirm, 1);
  assert.equal(session.state.result, "CHECKED_IN");
  await session.confirm(); assert.equal(calls.confirm, 1);
});
test("two clicks send exactly one confirmation and cannot change event in flight", async () => {
  const response = deferred();
  const { session, calls } = setup({ confirm: () => response.promise });
  await session.validate("test-qr");
  const pending = session.confirm(); await session.confirm(); session.selectEvent("event-b");
  assert.equal(calls.confirm, 1); assert.equal(session.state.event, "event-a");
  response.resolve(admitted); await pending;
});
test("late validation from a previous event cannot enable confirmation", async () => {
  const response = deferred();
  const { session, calls } = setup({ validate: () => response.promise });
  const pending = session.validate("test-qr"); session.selectEvent("event-b");
  response.resolve(valid); await pending; await session.confirm();
  assert.equal(session.state.event, "event-b"); assert.equal(session.state.phase, "idle"); assert.equal(calls.confirm, 0);
});
test("changed session cannot confirm a previously validated credential", async () => {
  const { session, calls, setToken } = setup();
  await session.validate("test-qr"); setToken("another-session"); await session.confirm();
  assert.equal(calls.confirm, 0); assert.equal(session.state.phase, "error");
});
test("used, unpaid, cancelled, refunded and unknown responses never enable access", async () => {
  for (const result of ["ALREADY_CHECKED_IN", "NOT_PAID", "CANCELLED", "REFUNDED", "FUTURE_RESULT"]) {
    const { session, calls } = setup({ validate: async () => ({ ...valid, result }) });
    await session.validate("test-qr"); await session.confirm(); assert.equal(calls.confirm, 0);
  }
});
test("lost confirmation response is reconciled by reading, never by automatic retry", async () => {
  let consumed = false;
  const { session, calls } = setup({
    validate: async () => consumed ? { ...valid, canCheckIn: false, result: "ALREADY_CHECKED_IN" } : valid,
    confirm: async () => { consumed = true; throw new Error("network failure after commit"); },
  });
  await session.validate("test-qr"); await session.confirm();
  assert.equal(session.state.phase, "uncertain"); await session.confirm(); assert.equal(calls.confirm, 1);
  await session.reconcile(); assert.equal(session.state.result, "ALREADY_CHECKED_IN"); assert.equal(calls.confirm, 1);
});
test("unauthenticated and missing input never contact API", async () => {
  const { session, calls, setToken } = setup();
  await session.validate(""); setToken(""); await session.validate("test-qr");
  assert.equal(calls.validate, 0); assert.equal(calls.confirm, 0);
});
test("disposal ignores pending responses", async () => {
  const response = deferred();
  const { session, calls } = setup({ validate: () => response.promise });
  const pending = session.validate("test-qr"); session.dispose(); response.resolve(valid); await pending;
  await session.confirm(); assert.equal(calls.confirm, 0);
});
