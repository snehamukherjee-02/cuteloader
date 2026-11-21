/** Input hygiene for anything a visitor types (showcase submissions). */

// C0 control characters (except tab/newline/CR), DEL, zero-width characters and
// bidirectional override/isolate characters, built from escapes so nothing invisible lives in source.
const CONTROL = new RegExp(
  "[" +
    String.fromCharCode(0) + "-" + String.fromCharCode(8) +
    String.fromCharCode(11, 12) +
    String.fromCharCode(14) + "-" + String.fromCharCode(31) +
    String.fromCharCode(127) +
    String.fromCharCode(0x200b) + "-" + String.fromCharCode(0x200f) +
    String.fromCharCode(0x202a) + "-" + String.fromCharCode(0x202e) +
    String.fromCharCode(0x2066) + "-" + String.fromCharCode(0x2069) +
    "]",
  "g",
);

export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

export function cleanUrl(value: unknown, opts: { requireHost?: string } = {}): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value.trim();
  if (raw.length > 200) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (url.username || url.password) return null;
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname)) return null;
  if (opts.requireHost && url.hostname !== opts.requireHost && !url.hostname.endsWith(`.${opts.requireHost}`)) return null;
  return url.toString();
}
