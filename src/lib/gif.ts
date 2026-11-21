/**
 * A small GIF89a encoder (palette quantization + LZW), no dependencies.
 * Runs entirely in the browser; nothing is uploaded anywhere.
 */

export interface RgbaFrame {
  data: Uint8ClampedArray; // RGBA, width * height * 4
  delayCs: number; // frame delay in 1/100 s
}

export interface GifOptions {
  width: number;
  height: number;
  /** Keep fully transparent pixels transparent (1-bit GIF transparency). */
  transparent: boolean;
  /** Color that semi-transparent edges are blended onto. */
  matte: [number, number, number];
}

const key15 = (r: number, g: number, b: number) => ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);

function composite(data: Uint8ClampedArray, i: number, matte: [number, number, number]): [number, number, number] {
  const a = data[i + 3];
  if (a === 255) return [data[i], data[i + 1], data[i + 2]];
  const f = a / 255;
  return [
    Math.round(data[i] * f + matte[0] * (1 - f)),
    Math.round(data[i + 1] * f + matte[1] * (1 - f)),
    Math.round(data[i + 2] * f + matte[2] * (1 - f)),
  ];
}

/** Popularity quantizer on a 15-bit color cube; plenty for flat, vector-style loaders. */
function buildPalette(frames: RgbaFrame[], o: GifOptions) {
  const count = new Uint32Array(32768);
  const sumR = new Float64Array(32768);
  const sumG = new Float64Array(32768);
  const sumB = new Float64Array(32768);
  for (const f of frames) {
    const d = f.data;
    for (let i = 0; i < d.length; i += 4) {
      if (o.transparent && d[i + 3] < 128) continue;
      const [r, g, b] = composite(d, i, o.matte);
      const k = key15(r, g, b);
      count[k]++;
      sumR[k] += r;
      sumG[k] += g;
      sumB[k] += b;
    }
  }
  const used: number[] = [];
  for (let k = 0; k < 32768; k++) if (count[k]) used.push(k);
  used.sort((a, b) => count[b] - count[a]);
  const max = o.transparent ? 255 : 256;
  const chosen = used.slice(0, max);
  const palette = new Uint8Array(256 * 3);
  chosen.forEach((k, i) => {
    palette[i * 3] = Math.round(sumR[k] / count[k]);
    palette[i * 3 + 1] = Math.round(sumG[k] / count[k]);
    palette[i * 3 + 2] = Math.round(sumB[k] / count[k]);
  });
  const transparentIndex = o.transparent ? 255 : -1;
  if (o.transparent) {
    palette[255 * 3] = o.matte[0];
    palette[255 * 3 + 1] = o.matte[1];
    palette[255 * 3 + 2] = o.matte[2];
  }
  const n = Math.max(1, chosen.length);
  const lookup = new Int16Array(32768).fill(-1);
  const nearest = (k: number) => {
    const cached = lookup[k];
    if (cached >= 0) return cached;
    const r = ((k >> 10) & 31) * 8 + 4;
    const g = ((k >> 5) & 31) * 8 + 4;
    const b = (k & 31) * 8 + 4;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < n; i++) {
      const dr = palette[i * 3] - r;
      const dg = palette[i * 3 + 1] - g;
      const db = palette[i * 3 + 2] - b;
      const dist = dr * dr * 2 + dg * dg * 4 + db * db * 3;
      if (dist < bestD) {
        bestD = dist;
        best = i;
      }
    }
    lookup[k] = best;
    return best;
  };
  return { palette, transparentIndex, nearest };
}

function lzw(indices: Uint8Array, minCodeSize: number): Uint8Array {
  const clear = 1 << minCodeSize;
  const eoi = clear + 1;
  let nextCode = eoi + 1;
  let codeSize = minCodeSize + 1;
  let table = new Map<number, number>();
  const out: number[] = [];
  let cur = 0;
  let shift = 0;
  const emit = (code: number) => {
    cur |= code << shift;
    shift += codeSize;
    while (shift >= 8) {
      out.push(cur & 0xff);
      cur >>>= 8;
      shift -= 8;
    }
  };
  emit(clear);
  let ib = indices[0];
  for (let i = 1; i < indices.length; i++) {
    const k = indices[i];
    const key = (ib << 8) | k;
    const code = table.get(key);
    if (code === undefined) {
      emit(ib);
      if (nextCode === 4096) {
        emit(clear);
        nextCode = eoi + 1;
        codeSize = minCodeSize + 1;
        table = new Map();
      } else {
        if (nextCode >= 1 << codeSize) codeSize++;
        table.set(key, nextCode++);
      }
      ib = k;
    } else {
      ib = code;
    }
  }
  emit(ib);
  emit(eoi);
  if (shift > 0) out.push(cur & 0xff);
  return Uint8Array.from(out);
}

class ByteWriter {
  private buf = new Uint8Array(1 << 16);
  private len = 0;
  private ensure(n: number) {
    if (this.len + n <= this.buf.length) return;
    let size = this.buf.length * 2;
    while (size < this.len + n) size *= 2;
    const next = new Uint8Array(size);
    next.set(this.buf.subarray(0, this.len));
    this.buf = next;
  }
  byte(b: number) {
    this.ensure(1);
    this.buf[this.len++] = b & 0xff;
  }
  u16(n: number) {
    this.byte(n & 0xff);
    this.byte((n >> 8) & 0xff);
  }
  bytes(arr: ArrayLike<number>) {
    this.ensure(arr.length);
    this.buf.set(arr as ArrayLike<number>, this.len);
    this.len += arr.length;
  }
  ascii(s: string) {
    for (let i = 0; i < s.length; i++) this.byte(s.charCodeAt(i));
  }
  result() {
    return this.buf.slice(0, this.len);
  }
}

export function encodeGif(frames: RgbaFrame[], o: GifOptions): Uint8Array {
  const { palette, transparentIndex, nearest } = buildPalette(frames, o);
  const w = new ByteWriter();
  w.ascii("GIF89a");
  w.u16(o.width);
  w.u16(o.height);
  w.byte(0xf7); // global color table, 8-bit color resolution, 256 entries
  w.byte(transparentIndex >= 0 ? transparentIndex : 0);
  w.byte(0);
  w.bytes(palette);
  // Loop forever (NETSCAPE2.0 application extension).
  w.byte(0x21);
  w.byte(0xff);
  w.byte(0x0b);
  w.ascii("NETSCAPE2.0");
  w.byte(0x03);
  w.byte(0x01);
  w.u16(0);
  w.byte(0x00);

  const px = o.width * o.height;
  const indices = new Uint8Array(px);
  for (const f of frames) {
    const d = f.data;
    for (let p = 0, i = 0; p < px; p++, i += 4) {
      if (transparentIndex >= 0 && d[i + 3] < 128) {
        indices[p] = transparentIndex;
      } else {
        const [r, g, b] = composite(d, i, o.matte);
        indices[p] = nearest(key15(r, g, b));
      }
    }
    // Graphic control extension: disposal 2 (restore to background) when transparent.
    w.byte(0x21);
    w.byte(0xf9);
    w.byte(0x04);
    w.byte(((transparentIndex >= 0 ? 2 : 1) << 2) | (transparentIndex >= 0 ? 1 : 0));
    w.u16(Math.max(2, Math.round(f.delayCs)));
    w.byte(transparentIndex >= 0 ? transparentIndex : 0);
    w.byte(0x00);
    // Image descriptor.
    w.byte(0x2c);
    w.u16(0);
    w.u16(0);
    w.u16(o.width);
    w.u16(o.height);
    w.byte(0x00);
    // Image data.
    w.byte(8);
    const data = lzw(indices, 8);
    for (let i = 0; i < data.length; i += 255) {
      const chunk = data.subarray(i, Math.min(i + 255, data.length));
      w.byte(chunk.length);
      w.bytes(chunk);
    }
    w.byte(0x00);
  }
  w.byte(0x3b);
  return w.result();
}
