export const COLOR_FAMILIES = [
  { id: "pink", label: "Pink", swatch: "#f472b6" },
  { id: "red", label: "Red", swatch: "#ef4444" },
  { id: "orange", label: "Orange", swatch: "#fb923c" },
  { id: "yellow", label: "Yellow", swatch: "#facc15" },
  { id: "green", label: "Green", swatch: "#22c55e" },
  { id: "teal", label: "Teal", swatch: "#14b8a6" },
  { id: "blue", label: "Blue", swatch: "#3b82f6" },
  { id: "purple", label: "Purple", swatch: "#8b5cf6" },
  { id: "neutral", label: "Neutral", swatch: "#94a3b8" },
] as const;

export type ColorFamily = (typeof COLOR_FAMILIES)[number]["id"];

export function hexToHsl(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue = 0;
  if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  return [hue * 60, s, l];
}

export function colorFamily(hex: string): ColorFamily {
  const [h, s, l] = hexToHsl(hex);
  if (s < 0.18 || l < 0.12 || l > 0.94) return "neutral";
  if (h < 12 || h >= 345) return "red";
  if (h < 42) return "orange";
  if (h < 68) return "yellow";
  if (h < 160) return "green";
  if (h < 195) return "teal";
  if (h < 250) return "blue";
  if (h < 290) return "purple";
  return "pink";
}

/** Relative luminance (WCAG) for contrast-aware UI decisions. */
export function luminance(hex: string): number {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const ch = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
