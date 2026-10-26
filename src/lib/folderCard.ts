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

// The site's own palette: paper, ink, olive, lime, sun, teal, coral.
// bg = folder stock, fg = type colour, ac = squiggle / accent.
const PAPER = "#F4F2ED";
const INK = "#0C0C0C";
const STOCKS = [
  { bg: INK, fg: PAPER, ac: "#B9CC4F" },
  { bg: "#B9CC4F", fg: INK, ac: INK },
  { bg: "#626F22", fg: PAPER, ac: "#B9CC4F" },
  { bg: PAPER, fg: INK, ac: "#0D9488" },
  { bg: "#F5A524", fg: INK, ac: INK },
  { bg: "#0D9488", fg: PAPER, ac: "#F5A524" },
  { bg: "#E24E66", fg: PAPER, ac: INK },
  { bg: "#E9E6DF", fg: INK, ac: "#E24E66" },
  { bg: "#2F3A0F", fg: PAPER, ac: "#F5A524" },
  { bg: "#F5A524", fg: INK, ac: "#0D9488" },
];
const OUT_SCALE = 0.8; // texture is 800x576, drawn in 1000x720 logical units

const DISPLAY = `"League Spartan", "Helvetica Neue", Arial, sans-serif`;
const MONO = `"JetBrains Mono", ui-monospace, Menlo, monospace`;

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

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

function loadLogo(src?: string): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    const t = window.setTimeout(() => resolve(null), 4000);
    img.onload = () => { window.clearTimeout(t); resolve(img); };
    img.onerror = () => { window.clearTimeout(t); resolve(null); };
    img.src = src;
  });
}

function squiggle(ctx: Ctx, x: number, y: number, w: number, color: string) {
  ctx.beginPath();
  const step = 26;
  ctx.moveTo(x, y);
  for (let cx = x; cx < x + w; cx += step * 2) {
    ctx.quadraticCurveTo(cx + step, y - 14, cx + step * 2, y);
  }
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.stroke();
}

async function drawFolder(p: Project, i: number, total: number): Promise<HTMLCanvasElement> {
  const logo = await loadLogo(p.logo);
  const c = document.createElement("canvas");
  c.width = Math.round(W * OUT_SCALE);
  c.height = Math.round(H * OUT_SCALE);
  const ctx = c.getContext("2d") as Ctx;
  ctx.scale(OUT_SCALE, OUT_SCALE);
  const { bg, fg, ac } = STOCKS[i % STOCKS.length];
  const darkStock = bg === INK || bg === "#2F3A0F" || bg === "#626F22" || bg === "#0D9488" || bg === "#E24E66";
  const hair = darkStock ? "rgba(244,242,237,0.28)" : "rgba(12,12,12,0.25)";
  const title = p.title.split(",")[0].toUpperCase();
  const num = String(i + 1).padStart(2, "0");
  const letter = String.fromCharCode(97 + i);

  // 1. back sheet peeking out behind the folder (a shade of the same stock)
  ctx.beginPath();
  ctx.moveTo(26, 62 + R);
  ctx.quadraticCurveTo(26, 56, 26 + R, 56);
  ctx.lineTo(W - 26 - R - 220, 56);
  ctx.lineTo(W - 26 - R - 220, H);
  ctx.lineTo(26, H);
  ctx.closePath();
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.fillStyle = darkStock ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.16)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = hair;
  ctx.stroke();

  // 2. front panel with tab: flat stock colour, a whisper of top light, grain
  folderPath(ctx);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.save();
  folderPath(ctx);
  ctx.clip();
  const light = ctx.createLinearGradient(0, TAB_Y, 0, H);
  light.addColorStop(0, "rgba(255,255,255,0.10)");
  light.addColorStop(1, "rgba(0,0,0,0.10)");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, W, H);

  // ghost number, like the project cards
  ctx.fillStyle = darkStock ? "rgba(244,242,237,0.07)" : "rgba(12,12,12,0.07)";
  ctx.font = `800 440px ${DISPLAY}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(num, W + 10, H + 70);

  const pat = noisePattern(ctx);
  if (pat) {
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();

  folderPath(ctx);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = hair;
  ctx.stroke();

  // 3. tab: file number
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = fg;
  ctx.font = `500 21px ${MONO}`;
  spaced(ctx, `FILE ${num} / ${String(total).padStart(2, "0")}`, 604, 62, 4);

  // 4. top row: "(a)  CATEGORY" and the notch arrow, then a hairline
  ctx.fillStyle = fg;
  ctx.font = `500 22px ${MONO}`;
  spaced(ctx, `(${letter})  ${p.category.toUpperCase()}`.slice(0, 40), 56, BODY_Y + 62, 4);

  const ax = W - 84;
  const ay = BODY_Y + 52;
  ctx.beginPath();
  ctx.arc(ax, ay, 34, 0, Math.PI * 2);
  ctx.fillStyle = fg; // inverse disc, like the bento notch
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.strokeStyle = bg;
  ctx.beginPath();
  ctx.moveTo(ax - 11, ay + 11);
  ctx.lineTo(ax + 11, ay - 11);
  ctx.moveTo(ax - 4, ay - 11);
  ctx.lineTo(ax + 11, ay - 11);
  ctx.lineTo(ax + 11, ay + 4);
  ctx.stroke();

  ctx.fillStyle = hair;
  ctx.fillRect(56, BODY_Y + 100, W - 112 - 0, 1.5);

  // 5. big title, anchored low, shrinks to fit three lines; squiggle underneath
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
  ctx.fillStyle = fg;
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${-size * 0.02}px`;
  const lh = size * 0.94;
  const baseY = H - 168;
  const firstY = baseY - (lines.length - 1) * lh;
  ctx.textAlign = "left";
  lines.forEach((l, li) => ctx.fillText(l, 52, firstY + li * lh));
  const lastW = ctx.measureText(lines[lines.length - 1]).width;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  squiggle(ctx, 56, baseY + 26, Math.min(Math.max(lastW, 200), 420), ac);

  // 6. micro-copy under a hairline; logo badge (like the bento tiles) or case-study link
  ctx.fillStyle = hair;
  ctx.fillRect(56, H - 116, W - 112, 1.5);
  ctx.fillStyle = fg;
  ctx.font = `400 17px ${MONO}`;
  const info = [p.client, p.period].filter(Boolean).join("  ·  ").toUpperCase();
  spaced(ctx, info.slice(0, 44), 56, H - 76, 3);
  ctx.globalAlpha = 0.65;
  const tags = p.tags.slice(0, 3).join("  /  ").toUpperCase();
  spaced(ctx, tags.slice(0, 46), 56, H - 44, 3);
  ctx.globalAlpha = 1;

  if (logo) {
    const bx = W - 56 - 84;
    const by = H - 104;
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.beginPath();
    ctx.roundRect(bx, by, 84, 72, 14);
    ctx.fill();
    const k = Math.min(64 / logo.naturalWidth, 52 / logo.naturalHeight);
    const lw = logo.naturalWidth * k;
    const lhh = logo.naturalHeight * k;
    ctx.drawImage(logo, bx + (84 - lw) / 2, by + (72 - lhh) / 2, lw, lhh);
  } else {
    ctx.fillStyle = fg;
    ctx.font = `500 17px ${MONO}`;
    spaced(ctx, "CASE STUDY  →", W - 56, H - 44, 4, "right");
  }

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
  return Promise.all(list.map(async (p, i) => toUrl(await drawFolder(p, i, list.length))));
}
