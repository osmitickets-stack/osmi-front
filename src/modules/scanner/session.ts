export interface Validation {
  authentic: boolean;
  canCheckIn: boolean;
  result: string;
  ticketCode: string;
}
export interface Admission {
  accepted: boolean;
  result: string;
  ticketCode: string;
}
export interface ScannerTransport {
  validate(event: string, credential: string, token: string): Promise<Validation>;
  confirm(event: string, credential: string, token: string): Promise<Admission>;
}
export interface ScannerState {
  phase: "idle" | "validating" | "ready" | "confirming" | "result" | "uncertain" | "error";
  event: string;
  result?: string;
  ticketCode?: string;
  message?: string;
}

export const resultLabels: Record<string, string> = {
  VALID: "Boleto válido. Falta confirmar el acceso.",
  CHECKED_IN: "Acceso registrado.",
  ALREADY_CHECKED_IN: "Este boleto ya fue utilizado.",
  NOT_PAID: "Este boleto todavía no está pagado.",
  REFUNDED: "Boleto reembolsado. No permite acceso.",
  CANCELLED: "Boleto cancelado. No permite acceso.",
  NOT_ELIGIBLE: "Este boleto no permite acceso.",
  TOO_EARLY: "El acceso todavía no está abierto.",
  CHECKIN_CLOSED: "El periodo de acceso ha terminado.",
};

export function scannerError(error: unknown): string {
  const status = typeof error === "object" && error !== null && "status" in error ? error.status : undefined;
  if (status === 401) return "Tu sesión venció o no es válida. Vuelve a iniciar sesión.";
  if (status === 403) return "No se autorizó la operación: revisa tus permisos, el evento y la credencial.";
  if (status === 404) return "No se encontró el boleto o el evento.";
  if (status === 400) return "Revisa el evento y la credencial introducida.";
  if (status === 429) return "Demasiados intentos. Espera un momento antes de volver a validar.";
  return "No se pudo conectar con OSMI. Comprueba tu conexión y vuelve a validar.";
}

// Credentials stay in memory; no localStorage, URLs or browser logs.
// The synchronous phase lock also prevents double clicks before React rerenders.
export class ScannerSession {
  state: ScannerState = { phase: "idle", event: "" };
  private credential = "";
  private validatedToken = "";
  private generation = 0;
  constructor(private transport: ScannerTransport, private token: () => string, private changed: (state: ScannerState) => void) {}
  private publish(state: ScannerState) { this.state = state; this.changed(state); }
  selectEvent(event: string) {
    if (this.state.phase === "confirming") return;
    this.generation++;
    this.credential = "";
    this.validatedToken = "";
    this.publish({ phase: "idle", event });
  }
  clear() { this.selectEvent(this.state.event); }
  dispose() { this.generation++; this.credential = ""; this.validatedToken = ""; }
  async validate(credential: string) {
    if (this.state.phase === "confirming" || this.state.phase === "validating") return;
    const event = this.state.event;
    const token = this.token();
    credential = credential.trim();
    if (!event || !credential || !token) {
      this.publish({ phase: "error", event, message: !token ? scannerError({ status: 401 }) : "Selecciona un evento e introduce la credencial del QR." });
      return;
    }
    const generation = ++this.generation;
    this.credential = credential;
    this.validatedToken = "";
    this.publish({ phase: "validating", event });
    try {
      const response = await this.transport.validate(event, credential, token);
      if (generation !== this.generation) return;
      if (this.token() !== token) { this.clear(); return; }
      const ready = response.authentic && response.canCheckIn && response.result === "VALID";
      this.validatedToken = ready ? token : "";
      this.publish({ phase: ready ? "ready" : "result", event, result: response.result, ticketCode: response.ticketCode });
    } catch (error) {
      if (generation !== this.generation) return;
      this.publish({ phase: "error", event, message: scannerError(error) });
    }
  }
  async confirm() {
    if (this.state.phase !== "ready") return;
    const event = this.state.event;
    if (!this.validatedToken || this.token() !== this.validatedToken) {
      this.clear();
      this.publish({ phase: "error", event, message: "La sesión cambió. Vuelve a validar el boleto." });
      return;
    }
    const generation = ++this.generation;
    this.publish({ ...this.state, phase: "confirming" });
    try {
      const response = await this.transport.confirm(event, this.credential, this.validatedToken);
      if (generation !== this.generation) return;
      // Do not invent a successful admission from a malformed response.
      if (response.accepted && response.result !== "CHECKED_IN") throw new Error("inconsistent admission");
      if (!response.accepted && response.result === "CHECKED_IN") throw new Error("inconsistent admission");
      this.publish({ phase: "result", event, result: response.result, ticketCode: response.ticketCode });
      this.credential = "";
    } catch (error) {
      if (generation !== this.generation) return;
      const status = typeof error === "object" && error !== null && "status" in error ? error.status : undefined;
      if (typeof status === "number" && [400, 401, 403, 404, 429].includes(status)) {
        this.publish({ phase: "error", event, message: scannerError(error) });
      } else {
        this.publish({ phase: "uncertain", event, message: "No pudimos confirmar la respuesta. El acceso podría haberse registrado. Consulta el estado antes de intentar de nuevo; no se reenviará automáticamente." });
      }
    } finally {
      this.validatedToken = "";
    }
  }
  async reconcile() { if (this.state.phase === "uncertain") await this.validate(this.credential); }
}
