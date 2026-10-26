import type { Project } from "@/data/content";

// Draws each project as a paper file folder (tab on the right, a darker sheet
// peeking out behind it), after the "Mis precios" / Délavé folder references:
// big grotesque title, tiny mono micro-copy, grain and a soft glow. The inside
// follows the bento tiles (mono "(a)" label, notch arrow, big League Spartan
// title) and the project cards (ghost number). Output is a transparent image,
// one object URL per project, ready to be used as a sphere texture.

const W = 1000;
const H = 720;
const BODY_Y = 86; // top edge of the front panel
const TAB_Y = 22; // top edge of the tab
const R = 30;

// Vivid folder colours (light edge to deep edge), one pair per project index.
const PALETTE: [string, string][] = [
  ["#4D5A12", "#9DB02A"], ["#B45309", "#F5A524"], ["#0F766E", "#2DD4BF"], ["#BE123C", "#FB7185"],
  ["#4338CA", "#818CF8"], ["#1D4ED8", "#60A5FA"], ["#86198F", "#E879F9"], ["#166534", "#4ADE80"],
  ["#9A3412", "#FB923C"], ["#0E7490", "#38BDF8"],
];
const OUT_SCALE = 0.8; // texture is 800x576, drawn in 1000x720 logical units

const DISPLAY = `"League Spartan", "Helvetica Neue", Arial, sans-serif`;
const MONO = `"JetBrains Mono", ui-monospace, Menlo, monospace`;

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function shade(hex: string, k: number) {
  const [r, g, b] = hexToRgb(hex);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

function folderPath(ctx: Ctx) {
  ctx.beginPath();
  ctx.moveTo(R, BODY_Y);
  ctx.lineTo(500, BODY_Y);
  ctx.bezierCurveTo(532, BODY_Y, 540, TAB_Y, 576, TAB_Y);
  ctx.lineTo(846, TAB_Y);
  ctx.bezierCurveTo(884, TAB_Y, 892, BODY_Y, 926, BODY_Y);
  ctx.lineTo(W - R, BODY_Y);
  ctx.quadraticCurveTo(W, BODY_Y, W, BODY_Y + R);
  ctx.lineTo(W, H - R);
  ctx.quadraticCurveTo(W, H, W - R, H);
  ctx.lineTo(R, H);
  ctx.quadraticCurveTo(0, H, 0, H - R);
  ctx.lineTo(0, BODY_Y + R);
  ctx.quadraticCurveTo(0, BODY_Y, R, BODY_Y);
  ctx.closePath();
}

// Letter-spaced text that works whether or not ctx.letterSpacing exists.
function spaced(ctx: Ctx, text: string, x: number, y: number, spacing: number, align: "left" | "right" = "left") {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0) - spacing;
  let cx = align === "right" ? x - total : x;
  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, cx, y);
    cx += widths[i];
  });
  return total;
}

function wrap(ctx: Ctx, text: string, maxW: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function noisePattern(ctx: Ctx) {
  const n = document.createElement("canvas");
  n.width = n.height = 180;
  const nctx = n.getContext("2d")!;
  const img = nctx.createImageData(180, 180);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() > 0.5 ? 255 : 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = Math.random() * 26;
  }
  nctx.putImageData(img, 0, 0);
  return ctx.createPattern(n, "repeat");
}

function drawFolder(p: Project, i: number, total: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.round(W * OUT_SCALE);
  c.height = Math.round(H * OUT_SCALE);
  const ctx = c.getContext("2d") as Ctx;
  ctx.scale(OUT_SCALE, OUT_SCALE);
  const [to, from] = PALETTE[i % PALETTE.length];
  const title = p.title.split(",")[0].toUpperCase();
  const num = String(i + 1).padStart(2, "0");
  const letter = String.fromCharCode(97 + i);

  // 1. back sheet peeking out behind the folder
  ctx.beginPath();
  ctx.moveTo(26, 62 + R);
  ctx.quadraticCurveTo(26, 56, 26 + R, 56);
  ctx.lineTo(W - 26 - R - 220, 56);
  ctx.lineTo(W - 26 - R - 220, H);
  ctx.lineTo(26, H);
  ctx.closePath();
  const back = ctx.createLinearGradient(0, 0, W, H);
  back.addColorStop(0, shade(from, 0.45));
  back.addColorStop(1, shade(to, 0.4));
  ctx.fillStyle = back;
  ctx.fill();

  // 2. front panel with tab
  folderPath(ctx);
  const g = ctx.createLinearGradient(0, TAB_Y, W, H);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.save();
  folderPath(ctx);
  ctx.clip();

  // soft glow (the red bloom in the reference) + bottom vignette
  const glow = ctx.createRadialGradient(W * 0.28, H * 0.42, 20, W * 0.28, H * 0.42, W * 0.7);
  glow.addColorStop(0, "rgba(255,255,255,0.30)");
  glow.addColorStop(0.5, "rgba(255,255,255,0.07)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  const vig = ctx.createLinearGradient(0, H * 0.45, 0, H);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.24)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  // ghost number, like the project cards
  ctx.fillStyle = "rgba(255,255,255,0.09)";
  ctx.font = `800 440px ${DISPLAY}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(num, W + 10, H + 70);

  // grain
  const pat = noisePattern(ctx);
  if (pat) {
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();

  // crisp edge + inner highlight
  folderPath(ctx);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.30)";
  ctx.stroke();

  // 3. tab content
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `500 21px ${MONO}`;
  spaced(ctx, `FILE ${num} / ${String(total).padStart(2, "0")}`, 604, 62, 4);

  // 4. top row inside the body: "(a) · CATEGORY" and the notch arrow
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `500 22px ${MONO}`;
  const label = `(${letter})  ${p.category.toUpperCase()}`;
  spaced(ctx, label, 56, BODY_Y + 62, 4);

  const ax = W - 92;
  const ay = BODY_Y + 52;
  ctx.beginPath();
  ctx.arc(ax, ay, 32, 0, Math.PI * 2);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ax - 11, ay + 11);
  ctx.lineTo(ax + 11, ay - 11);
  ctx.moveTo(ax - 4, ay - 11);
  ctx.lineTo(ax + 11, ay - 11);
  ctx.lineTo(ax + 11, ay + 4);
  ctx.stroke();

  // 5. big title, anchored to the bottom, shrinks to fit three lines
  const maxW = W - 112;
  let size = 150;
  let lines: string[] = [];
  for (; size >= 64; size -= 4) {
    ctx.font = `800 ${size}px ${DISPLAY}`;
    lines = wrap(ctx, title, maxW);
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    if (lines.length <= 3 && widest <= maxW) break;
  }
  ctx.font = `800 ${size}px ${DISPLAY}`;
  ctx.fillStyle = "#ffffff";
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${-size * 0.02}px`;
  const lh = size * 0.94;
  const baseY = H - 150;
  const firstY = baseY - (lines.length - 1) * lh;
  ctx.textAlign = "left";
  lines.forEach((l, li) => ctx.fillText(l, 52, firstY + li * lh));
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // 6. micro-copy block, like the tiny spec text around the reference folder
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillRect(56, H - 118, W - 112, 1.5);
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = `400 17px ${MONO}`;
  const info = [p.client, p.period].filter(Boolean).join("  ·  ").toUpperCase();
  spaced(ctx, info.slice(0, 48), 56, H - 78, 3);
  const tags = p.tags.slice(0, 3).join("  /  ").toUpperCase();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  spaced(ctx, tags.slice(0, 52), 56, H - 46, 3);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = `500 17px ${MONO}`;
  spaced(ctx, "CASE STUDY  →", W - 56, H - 46, 4, "right");

  return c;
}

export async function loadFolderFonts() {
  if (!document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`800 100px "League Spartan"`),
      document.fonts.load(`500 22px "JetBrains Mono"`),
      document.fonts.load(`400 17px "JetBrains Mono"`),
    ]);
    await document.fonts.ready;
  } catch {
    /* fall back to system fonts */
  }
}

const toUrl = (c: HTMLCanvasElement) =>
  new Promise<string>((resolve) => {
    c.toBlob(
      (b) => resolve(b ? URL.createObjectURL(b) : c.toDataURL("image/png")),
      "image/webp",
      0.9
    );
  });

export async function makeFolderCards(list: Project[]): Promise<string[]> {
  await loadFolderFonts();
  // draw synchronously, encode in parallel
  return Promise.all(list.map((p, i) => toUrl(drawFolder(p, i, list.length))));
}
