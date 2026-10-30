import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function transpile(path) {
  return ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } }).outputText;
}
function moduleURL(source) { return `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`; }
process.env.NEXT_PUBLIC_API_URL = "https://scanner.invalid";
const apiURL = moduleURL(transpile("../../src/lib/api.ts"));
const { api, ApiError } = await import(apiURL);
const scannerURL = moduleURL(transpile("../../src/modules/scanner/api.ts").replace('"@/lib/api"', JSON.stringify(apiURL)));
const { scannerTransport, listScannerEvents } = await import(scannerURL);

test("scanner sends the exact event/credential contract and a bearer, never a user-id", async t => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, options });
    return Response.json({ authentic: true, can_check_in: true, result: "VALID", ticket_code: "TEST" });
  });
  const result = await scannerTransport.validate("event-a", "fictitious-qr", "fictitious-token");
  assert.equal(result.canCheckIn, true); assert.equal(result.ticketCode, "TEST");
  assert.equal(calls[0].url, "https://scanner.invalid/v1/tickets/validate");
  assert.deepEqual(JSON.parse(calls[0].options.body), { event_id: "event-a", credential: "fictitious-qr" });
  assert.equal(calls[0].options.headers.Authorization, "Bearer fictitious-token");
  assert.equal(calls[0].options.headers["user-id"], undefined);
  assert.equal(calls[0].options.cache, "no-store");
});
test("confirmation uses its own endpoint and preserves explicit acceptance", async t => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://scanner.invalid/v1/tickets/check-in");
    assert.deepEqual(JSON.parse(options.body), { event_id: "event-a", credential: "fictitious-qr", method: "qr_code", location: "web_scanner" });
    return Response.json({ accepted: true, result: "CHECKED_IN", ticketCode: "TEST" });
  });
  assert.equal((await scannerTransport.confirm("event-a", "fictitious-qr", "fictitious-token")).accepted, true);
});
test("empty protobuf event list is valid; cursor is encoded and backend names normalized", async t => {
  globalThis.document = { cookie: "token=fictitious-token" };
  t.after(() => { delete globalThis.document; });
  t.mock.method(globalThis, "fetch", async url => {
    assert.equal(url, "https://scanner.invalid/v1/check-in/events?cursor=next%26page");
    return Response.json({ next_cursor: "next" });
  });
  assert.deepEqual(await listScannerEvents("next&page"), { events: [], nextCursor: "next" });
});
test("shared client still supports existing calls and exposes HTTP status without changing Error behavior", async t => {
  t.mock.method(console, "error", () => {});
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(options.method, "GET"); assert.equal(options.headers.Authorization, undefined);
    return new Response("denied", { status: 401 });
  });
  await assert.rejects(api.get("/test"), error => error instanceof Error && error instanceof ApiError && error.status === 401);
});
