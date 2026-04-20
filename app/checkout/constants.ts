import { FontOption, FontFamilyGroup, JenisOption, ProductConfig } from './types';

// ─── Real product images
const P1_IMAGES: Record<string, string> = {
  'black-silver_M':    '/images/black_silver_m.png',
  'black-silver_L':    '/images/black_silver_l.png',
  'black-silver_XL':   '/images/black_silver_xl.png',
  'black-frosted_M':   '/images/blackfrosted_m.png',
  'black-frosted_L':   '/images/blackfrosted_l.png',
  'black-frosted_XL':  '/images/blackfrosted_xl.png',
  'white-black_M':     '/images/whiteblack_m.png',
  'white-black_L':     '/images/whiteblack_l.png',
  'white-black_XL':    '/images/whiteblack_xl.png',
};

const P2_IMAGES: Record<string, string> = {
  'black-led_S':  '/images/nomor_led_s.png',
  'black-led_M':  '/images/nomor_led_m.png',
  'black-led_L':  '/images/nomor_led_l.png',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
export const PRODUCTS: Record<number, ProductConfig> = {
  1: {
    shape: 'portrait',
    images: P1_IMAGES,
    jenis: [
      { id: 'black-silver',  label: 'Black Silver',  bg: '#111111', textColor: '#C8C8C8', subColor: '#A0A0A0', lineColor: '#C8C8C8', frameColor: '#8a8a8a', led: false },
      { id: 'black-frosted', label: 'Black Frosted', bg: '#1a1a1a', textColor: '#d8d8d8', subColor: '#aaaaaa', lineColor: '#d8d8d8', frameColor: '#606060', led: false },
      { id: 'white-black',   label: 'White Black',   bg: '#f0f0f0', textColor: '#111111', subColor: '#444444', lineColor: '#111111', frameColor: '#888888', led: false },
    ],
    sizes: [
      { id: 'M',  label: 'M',  dim: '14x30 cm',  price: 57900  },
      { id: 'L',  label: 'L',  dim: '16x32 cm', price: 79900  },
      { id: 'XL', label: 'XL', dim: '18x33 cm', price: 109900 },
    ],
  },
  2: {
    shape: 'landscape',
    images: P2_IMAGES,
    jenis: [
      { id: 'black-led', label: 'Black LED Solar', bg: '#0d0d0d', textColor: '#C8C8C8', subColor: '#C8C8C8', lineColor: '#111111', frameColor: null, led: true },
    ],
    sizes: [
      { id: 'S', label: 'S', dim: '18×15 cm',   price: 89900  },
      { id: 'M', label: 'M', dim: '25,5×15 cm', price: 129900 },
      { id: 'L', label: 'L', dim: '24,5×22 cm', price: 179900 },
    ],
  },
};

// ─── Font Families ────────────────────────────────────────────────────────────
export const FONT_FAMILIES: FontFamilyGroup[] = [
  {
    id: 'garet',
    label: 'Garet',
    css: 'Garet',
    variants: [
      { id: 'garet-book',  label: 'Book',  weight: 400, style: 'normal' },
      { id: 'garet-heavy', label: 'Heavy', weight: 900, style: 'normal' },
    ],
  },
  {
    id: 'jakarta',
    label: 'Plus Jakarta Sans',
    css: 'Plus Jakarta Sans',
    variants: [
      { id: 'jakarta-extralight',        label: 'Extra Light',        weight: 200, style: 'normal' },
      { id: 'jakarta-extralight-italic', label: 'Extra Light Italic', weight: 200, style: 'italic' },
      { id: 'jakarta-light',             label: 'Light',              weight: 300, style: 'normal' },
      { id: 'jakarta-light-italic',      label: 'Light Italic',       weight: 300, style: 'italic' },
      { id: 'jakarta-regular',           label: 'Regular',            weight: 400, style: 'normal' },
      { id: 'jakarta-italic',            label: 'Italic',             weight: 400, style: 'italic' },
      { id: 'jakarta-medium',            label: 'Medium',             weight: 500, style: 'normal' },
      { id: 'jakarta-medium-italic',     label: 'Medium Italic',      weight: 500, style: 'italic' },
      { id: 'jakarta-semibold',          label: 'Semi Bold',          weight: 600, style: 'normal' },
      { id: 'jakarta-semibold-italic',   label: 'Semi Bold Italic',   weight: 600, style: 'italic' },
      { id: 'jakarta-bold',              label: 'Bold',               weight: 700, style: 'normal' },
      { id: 'jakarta-bold-italic',       label: 'Bold Italic',        weight: 700, style: 'italic' },
      { id: 'jakarta-extrabold',         label: 'Extra Bold',         weight: 800, style: 'normal' },
      { id: 'jakarta-extrabold-italic',  label: 'Extra Bold Italic',  weight: 800, style: 'italic' },
    ],
  },
];

export const WA_NUMBER = '628999089993';

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatRp(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(n);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxW && current) { lines.push(current); current = word; }
    else current = test;
  }
  if (current) lines.push(current);
  return lines;
}

function drawSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  spacing: number,
) {
  const chars = text.split('');
  let totalW = 0;
  chars.forEach(ch => { totalW += ctx.measureText(ch).width + spacing; });
  totalW -= spacing;

  let x = cx - totalW / 2;
  ctx.textAlign = 'left';
  chars.forEach(ch => {
    ctx.fillText(ch, x, y);
    x += ctx.measureText(ch).width + spacing;
  });
  ctx.textAlign = 'center';
}

// ─── Canvas Renderers ─────────────────────────────────────────────────────────

export function drawPortrait(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  jenis: JenisOption, font: FontOption,
  topText: string, bottomText: string, subText: string,
) {
  ctx.clearRect(0, 0, W, H);
  const FRAME = 11;
  const R = 16;
  const cx = W / 2;

  if (jenis.frameColor) {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#c0c0c0');
    grad.addColorStop(0.4, jenis.frameColor);
    grad.addColorStop(1, '#686868');
    ctx.fillStyle = grad;
    roundRect(ctx, 0, 0, W, H, R + 4);
    ctx.fill();
  }

  ctx.fillStyle = jenis.bg;
  roundRect(ctx, FRAME, FRAME, W - FRAME * 2, H - FRAME * 2, R);
  ctx.fill();

  if (jenis.frameColor) {
    const screwPositions = [[cx, FRAME + 13], [cx, H - FRAME - 13]];
    screwPositions.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#404040';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#707070';
      ctx.fill();
    });
  }

  const insetTop    = FRAME + (jenis.frameColor ? 30 : 16);
  const insetBottom = H - FRAME - (jenis.frameColor ? 30 : 16);
  const insetH      = insetBottom - insetTop;

  const subFontSize = Math.max(13, W * 0.13);
  ctx.font = `${font.style} ${font.weight} ${subFontSize}px "${font.css}"`;

  const subMaxW = W - FRAME * 2 - 20;
  const subLines = wrapText(ctx, subText.toUpperCase(), subMaxW);
  const subLineH = subFontSize * 1.25;
  const subBlockH = subLines.length * subLineH;

  const subCenterY = insetTop + insetH * 0.74;
  ctx.fillStyle = jenis.subColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  subLines.forEach((line, i) => {
    const y = subCenterY + (i - (subLines.length - 1) / 2) * subLineH;
    drawSpacedText(ctx, line, cx, y, 2.5);
  });

  const mainBottom = subCenterY - subBlockH / 2 - 10;
  const mainTop    = insetTop;
  const mainH      = mainBottom - mainTop;

  if (bottomText) {
    const topSize  = Math.min(mainH * 0.44, W * 0.54);
    const botSize  = Math.min(mainH * 0.40, W * 0.50);
    const lineH    = Math.max(1.5, W * 0.011);
    const lineW    = W * 0.52;
    const vGap     = mainH * 0.05;

    const totalH = topSize + vGap + lineH + vGap + botSize;
    const startY = mainTop + (mainH - totalH) / 2;

    ctx.font = `${font.style} ${font.weight} ${topSize}px "${font.css}"`;
    ctx.fillStyle = jenis.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(topText, cx, startY + topSize * 0.86);

    const lineY = startY + topSize + vGap;
    ctx.strokeStyle = jenis.lineColor;
    ctx.lineWidth = lineH;
    ctx.beginPath();
    ctx.moveTo(cx - lineW / 2, lineY);
    ctx.lineTo(cx + lineW / 2, lineY);
    ctx.stroke();

    ctx.font = `${font.style} ${font.weight} ${botSize}px "${font.css}"`;
    ctx.fillStyle = jenis.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(bottomText, cx, lineY + vGap + botSize * 0.86);

  } else {
    const sz = Math.min(mainH * 0.6, W * 0.5);
    ctx.font = `${font.style} ${font.weight} ${sz}px "${font.css}"`;
    ctx.fillStyle = jenis.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(topText, cx, mainTop + mainH / 2);
  }
}

export function drawLandscape(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  jenis: JenisOption, font: FontOption,
  mainText: string, subText: string,
) {
  ctx.clearRect(0, 0, W, H);
  const R = 12;
  const PAD = 16;
  const cx = W / 2;

  // ── Backlight glow di belakang plat (sebelum gambar plat) ──
  if (jenis.led) {
    // Layer 1: glow paling luar & diffuse
    ctx.save();
    ctx.shadowColor = 'rgba(215, 185, 110, 0.5)';
    ctx.shadowBlur = 50;
    ctx.fillStyle = 'rgba(215, 185, 110, 0.01)';
    roundRect(ctx, -4, -4, W + 8, H + 8, R + 6);
    ctx.fill();
    ctx.restore();

    // Layer 2: glow menengah
    ctx.save();
    ctx.shadowColor = 'rgba(225, 195, 120, 0.6)';
    ctx.shadowBlur = 28;
    ctx.fillStyle = 'rgba(225, 195, 120, 0.01)';
    roundRect(ctx, -2, -2, W + 4, H + 4, R + 4);
    ctx.fill();
    ctx.restore();

    // Layer 3: inner edge glow (cahaya hangat di tepi plat)
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 184, 106, 0.2)';
    ctx.lineWidth = 7;
    ctx.shadowColor = 'rgba(212, 184, 106, 0.65)';
    ctx.shadowBlur = 24;
    roundRect(ctx, 3, 3, W - 6, H - 6, R - 1);
    ctx.stroke();
    ctx.restore();
  }

  // ── Plate background ──
  ctx.fillStyle = jenis.bg;
  roundRect(ctx, 0, 0, W, H, R);
  ctx.fill();

  // ── Corner screws ──
  const screwInset = 14;
  [[screwInset, screwInset], [W - screwInset, screwInset],
   [screwInset, H - screwInset], [W - screwInset, H - screwInset]
  ].forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#252525';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#3a3a3a';
    ctx.fill();
  });

  // ── Ukuran font ──
  const subFontSize = Math.max(14, H * 0.13);
  const mainAreaH = (H - PAD * 2) * 0.68;
  const mainFontSize = Math.min(mainAreaH * 0.72, W * 0.195);
  const subY = PAD + (H - PAD * 2) * 0.80;
  const mainY = PAD + mainAreaH / 2;

  if (jenis.led) {
    // ── Teks utama dengan efek glow LED ──
    const WARM = 'rgba(240, 215, 145, 1)';
    const WARM_MID = 'rgba(225, 200, 130, 0.85)';
    const WARM_SOFT = 'rgba(200, 175, 100, 0.35)';

    // Glow paling luar - main text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${mainFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM_SOFT;
    ctx.shadowColor = 'rgba(225, 200, 130, 0.75)';
    ctx.shadowBlur = 28;
    ctx.fillText(mainText, cx, mainY);
    ctx.restore();

    // Glow medium - main text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${mainFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM_MID;
    ctx.shadowColor = 'rgba(225, 200, 130, 0.6)';
    ctx.shadowBlur = 12;
    ctx.fillText(mainText, cx, mainY);
    ctx.restore();

    // Teks tajam atas - main text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${mainFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM;
    ctx.shadowColor = 'rgba(240, 220, 160, 0.4)';
    ctx.shadowBlur = 4;
    ctx.fillText(mainText, cx, mainY);
    ctx.restore();

    // Glow paling luar - sub text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${subFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM_SOFT;
    ctx.shadowColor = 'rgba(225, 200, 130, 0.65)';
    ctx.shadowBlur = 20;
    drawSpacedText(ctx, subText, cx, subY, 1.5);
    ctx.restore();

    // Glow medium - sub text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${subFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM_MID;
    ctx.shadowColor = 'rgba(225, 200, 130, 0.5)';
    ctx.shadowBlur = 9;
    drawSpacedText(ctx, subText, cx, subY, 1.5);
    ctx.restore();

    // Teks tajam atas - sub text
    ctx.save();
    ctx.font = `${font.style} ${font.weight} ${subFontSize}px "${font.css}"`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = WARM;
    ctx.shadowColor = 'rgba(240, 220, 160, 0.3)';
    ctx.shadowBlur = 3;
    drawSpacedText(ctx, subText, cx, subY, 1.5);
    ctx.restore();

  } else {
    // ── Teks biasa (fallback non-LED) ──
    ctx.font = `${font.style} ${font.weight} ${subFontSize}px "${font.css}"`;
    ctx.fillStyle = jenis.subColor;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    drawSpacedText(ctx, subText, cx, subY, 1.5);

    ctx.font = `${font.style} ${font.weight} ${mainFontSize}px "${font.css}"`;
    ctx.fillStyle = jenis.textColor;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(mainText, cx, mainY);
  }
}
