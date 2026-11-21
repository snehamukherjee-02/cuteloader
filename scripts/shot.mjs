// Dev helper: screenshot a URL with headless Chrome.
//   node scripts/shot.mjs <url> <out.png> [width] [height] [--dark] [--mobile]
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const [url, out, w = "1440", h = "2400", ...flags] = process.argv.slice(2);
const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
].find((c) => c && existsSync(c));
const profile = mkdtempSync(join(tmpdir(), "cl-shot-"));
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--hide-scrollbars",
  `--user-data-dir=${profile}`,
  "--virtual-time-budget=5000",
  `--window-size=${w},${h}`,
  `--screenshot=${resolve(out)}`,
];
if (flags.includes("--dark")) args.push("--force-dark-mode", "--blink-settings=preferredColorScheme=0");
if (flags.includes("--mobile")) args.push("--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148");
try {
  execFileSync(chrome, [...args, url], { stdio: "ignore", timeout: 120000 });
} finally {
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
console.log(out);
