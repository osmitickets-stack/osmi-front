import { api } from "@/lib/api";
import type { Admission, ScannerTransport, Validation } from "./session";

export interface ScannerEvent { publicId: string; name: string; startsAt: string }
type Wire = Record<string, unknown>;
function text(value: unknown): string { return typeof value === "string" ? value : ""; }
function options() { return { signal: AbortSignal.timeout(15000), cache: "no-store" as const }; }

export function sessionToken(): string {
  if (typeof document === "undefined") return "";
  return document.cookie.split(";").map(v => v.trim()).find(v => v.startsWith("token="))?.slice(6) ?? "";
}

export async function listScannerEvents(cursor = ""): Promise<{ events: ScannerEvent[]; nextCursor: string }> {
  const token = sessionToken();
  if (!token) throw { status: 401 };
  const response = await api.get<Wire>(`/v1/check-in/events${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`, token, options());
  const rows = response.events ?? [];
  if (!Array.isArray(rows)) throw new Error("invalid events response");
  const events = rows.map((event: Wire) => ({ publicId: text(event.publicId ?? event.public_id), name: text(event.name), startsAt: text(event.startsAt ?? event.starts_at) }));
  if (events.some(event => !event.publicId || !event.name)) throw new Error("invalid event");
  return { events, nextCursor: text(response.nextCursor ?? response.next_cursor) };
}

export const scannerTransport: ScannerTransport = {
  async validate(event, credential, token): Promise<Validation> {
    const response = await api.post<Wire>("/v1/tickets/validate", { event_id: event, credential }, token, options());
    if (typeof response.result !== "string") throw new Error("invalid validation response");
    return { authentic: response.authentic === true, canCheckIn: (response.canCheckIn ?? response.can_check_in) === true, result: response.result, ticketCode: text(response.ticketCode ?? response.ticket_code) };
  },
  async confirm(event, credential, token): Promise<Admission> {
    const response = await api.post<Wire>("/v1/tickets/check-in", { event_id: event, credential, method: "qr_code", location: "web_scanner" }, token, options());
    if (typeof response.result !== "string") throw new Error("invalid admission response");
    return { accepted: response.accepted === true, result: response.result, ticketCode: text(response.ticketCode ?? response.ticket_code) };
  },
};
