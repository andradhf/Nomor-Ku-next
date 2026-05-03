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

const P3_IMAGES: Record<string, string> = {
  'white-solar_M':  '/images/produk_led_box_m.png',
  'white-solar_L':  '/images/produk_led_box_l.png',
  'white-solar_XL': '/images/produk_led_box_xl.png',
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
  3: {
    shape: 'lightbox',
    images: P3_IMAGES,
    jenis: [
      { id: 'white-solar', label: 'White Solar LED', bg: '#f5f0e0', textColor: '#111111', subColor: '#222222', lineColor: '#333333', frameColor: null, led: true },
    ],
    sizes: [
      { id: 'M',  label: 'M',  dim: '37×17×7 cm',  price: 291500 },
      { id: 'L',  label: 'L',  dim: '40×20×7 cm',  price: 308000 },
      { id: 'XL', label: 'XL', dim: '45×22×7 cm',  price: 340000 },
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

// ─── Shrink-to-fit helper ─────────────────────────────────────────────────────
// Menurunkan ukuran font satu per satu sampai teks muat dalam maxW
function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontStyle: string,
  fontWeight: number,
  fontCss: string,
  startSize: number,
  maxW: number,
  minSize = 10,
): number {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${fontStyle} ${fontWeight} ${size}px "${fontCss}"`;
    if (ctx.measureText(text).width <= maxW) break;
    size -= 1;
  }
  return size;
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

    // Layer 3: inner edge glow
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 184, 106, 0.2)';
    ctx.lineWidth = 7;
    ctx.shadowColor = 'rgba(212, 184, 106, 0.65)';
    ctx.shadowBlur = 24;
    roundRect(ctx, 3, 3, W - 6, H - 6, R - 1);
    ctx.stroke();
    ctx.restore();
  }

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
  
  if (jenis.led) {
    const WARM = 'rgba(240, 215, 145, 1)';
    const WARM_MID = 'rgba(225, 200, 130, 0.85)';
    const WARM_SOFT = 'rgba(200, 175, 100, 0.35)';

    subLines.forEach((line, i) => {
      const y = subCenterY + (i - (subLines.length - 1) / 2) * subLineH;
      // Glow outer
      ctx.save();
      ctx.fillStyle = WARM_SOFT;
      ctx.shadowColor = 'rgba(225, 200, 130, 0.65)';
      ctx.shadowBlur = 20;
      drawSpacedText(ctx, line, cx, y, 2.5);
      ctx.restore();

      // Glow mid
      ctx.save();
      ctx.fillStyle = WARM_MID;
      ctx.shadowColor = 'rgba(225, 200, 130, 0.5)';
      ctx.shadowBlur = 9;
      drawSpacedText(ctx, line, cx, y, 2.5);
      ctx.restore();

      // Sharp text
      ctx.save();
      ctx.fillStyle = WARM;
      ctx.shadowColor = 'rgba(240, 220, 160, 0.3)';
      ctx.shadowBlur = 3;
      drawSpacedText(ctx, line, cx, y, 2.5);
      ctx.restore();
    });
  } else {
    ctx.fillStyle = jenis.subColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    subLines.forEach((line, i) => {
      const y = subCenterY + (i - (subLines.length - 1) / 2) * subLineH;
      drawSpacedText(ctx, line, cx, y, 2.5);
    });
  }

  const mainBottom = subCenterY - subBlockH / 2 - 10;
  const mainTop    = insetTop;
  const mainH      = mainBottom - mainTop;

  if (bottomText) {
    // Hitung ukuran awal
    let topSize = Math.min(mainH * 0.44, W * 0.54);
    let botSize = Math.min(mainH * 0.40, W * 0.50);
    const lineH  = Math.max(1.5, W * 0.011);
    const lineW  = W * 0.52;
    const vGap   = mainH * 0.05;
    // Batas maksimum lebar teks (lebar plat dalam dikurangi margin kiri-kanan)
    const maxTextW = W - FRAME * 2 - 24;

    // Shrink-to-fit: kecilkan sampai teks muat
    topSize = fitFontSize(ctx, topText,    font.style, font.weight, font.css, topSize, maxTextW);
    botSize = fitFontSize(ctx, bottomText, font.style, font.weight, font.css, botSize, maxTextW);

    const totalH = topSize + vGap + lineH + vGap + botSize;
    const startY = mainTop + (mainH - totalH) / 2;

    const lineY = startY + topSize + vGap;

    if (jenis.led) {
      const WARM = 'rgba(240, 215, 145, 1)';
      const WARM_MID = 'rgba(225, 200, 130, 0.85)';
      const WARM_SOFT = 'rgba(200, 175, 100, 0.35)';

      const drawGlowingText = (text: string, yPos: number, size: number) => {
        ctx.font = `${font.style} ${font.weight} ${size}px "${font.css}"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        
        ctx.save();
        ctx.fillStyle = WARM_SOFT;
        ctx.shadowColor = 'rgba(225, 200, 130, 0.75)';
        ctx.shadowBlur = 28;
        ctx.fillText(text, cx, yPos);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = WARM_MID;
        ctx.shadowColor = 'rgba(225, 200, 130, 0.6)';
        ctx.shadowBlur = 12;
        ctx.fillText(text, cx, yPos);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = WARM;
        ctx.shadowColor = 'rgba(240, 220, 160, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fillText(text, cx, yPos);
        ctx.restore();
      };

      drawGlowingText(topText, startY + topSize * 0.86, topSize);

      ctx.save();
      ctx.strokeStyle = WARM;
      ctx.shadowColor = 'rgba(240, 220, 160, 0.6)';
      ctx.shadowBlur = 10;
      ctx.lineWidth = lineH;
      ctx.beginPath();
      ctx.moveTo(cx - lineW / 2, lineY);
      ctx.lineTo(cx + lineW / 2, lineY);
      ctx.stroke();
      ctx.restore();

      drawGlowingText(bottomText, lineY + vGap + botSize * 0.86, botSize);
    } else {
      ctx.font = `${font.style} ${font.weight} ${topSize}px "${font.css}"`;
      ctx.fillStyle = jenis.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(topText, cx, startY + topSize * 0.86);

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
    }

  } else {
    const maxTextW = W - FRAME * 2 - 24;
    let sz = Math.min(mainH * 0.6, W * 0.5);
    sz = fitFontSize(ctx, topText, font.style, font.weight, font.css, sz, maxTextW);
    
    if (jenis.led) {
      const WARM = 'rgba(240, 215, 145, 1)';
      const WARM_MID = 'rgba(225, 200, 130, 0.85)';
      const WARM_SOFT = 'rgba(200, 175, 100, 0.35)';

      ctx.font = `${font.style} ${font.weight} ${sz}px "${font.css}"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.save();
      ctx.fillStyle = WARM_SOFT;
      ctx.shadowColor = 'rgba(225, 200, 130, 0.75)';
      ctx.shadowBlur = 28;
      ctx.fillText(topText, cx, mainTop + mainH / 2);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = WARM_MID;
      ctx.shadowColor = 'rgba(225, 200, 130, 0.6)';
      ctx.shadowBlur = 12;
      ctx.fillText(topText, cx, mainTop + mainH / 2);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = WARM;
      ctx.shadowColor = 'rgba(240, 220, 160, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fillText(topText, cx, mainTop + mainH / 2);
      ctx.restore();
    } else {
      ctx.font = `${font.style} ${font.weight} ${sz}px "${font.css}"`;
      ctx.fillStyle = jenis.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(topText, cx, mainTop + mainH / 2);
    }
  }
}

export function drawLandscape(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  jenis: JenisOption, font: FontOption,
  mainText: string, subText: string,
) {
  ctx.clearRect(0, 0, W, H);
  const R = 0; // Radius dihilangkan sesuai permintaan
  const PAD = 16;
  const cx = W / 2;

  // ── Backlight glow di belakang plat (sebelum gambar plat) ──
  if (jenis.led) {
    // Layer 1: glow paling luar & diffuse
    ctx.save();
    ctx.shadowColor = 'rgba(215, 185, 110, 0.5)';
    ctx.shadowBlur = 50;
    ctx.fillStyle = 'rgba(215, 185, 110, 0.01)';
    roundRect(ctx, -4, -4, W + 8, H + 8, 0);
    ctx.fill();
    ctx.restore();

    // Layer 2: glow menengah
    ctx.save();
    ctx.shadowColor = 'rgba(225, 195, 120, 0.6)';
    ctx.shadowBlur = 28;
    ctx.fillStyle = 'rgba(225, 195, 120, 0.01)';
    roundRect(ctx, -2, -2, W + 4, H + 4, 0);
    ctx.fill();
    ctx.restore();

    // Layer 3: inner edge glow (cahaya hangat di tepi plat)
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 184, 106, 0.2)';
    ctx.lineWidth = 7;
    ctx.shadowColor = 'rgba(212, 184, 106, 0.65)';
    ctx.shadowBlur = 24;
    roundRect(ctx, 3, 3, W - 6, H - 6, 0);
    ctx.stroke();
    ctx.restore();
  }

  // ── Plate background ──
  ctx.fillStyle = jenis.bg;
  roundRect(ctx, 0, 0, W, H, 0);
  ctx.fill();



  // ── Ukuran font ──
  const PAD_H = 16 + 14; // plate padding + screw inset margin
  const maxTextW = W - PAD_H * 2;
  const subFontSizeInit = Math.max(14, H * 0.13);
  const mainAreaH = (H - PAD * 2) * 0.68;
  const mainFontSizeInit = Math.min(mainAreaH * 0.72, W * 0.195);
  const subY = PAD + (H - PAD * 2) * 0.80;
  const mainY = PAD + mainAreaH / 2;
  // Shrink-to-fit
  const mainFontSize = fitFontSize(ctx, mainText, font.style, font.weight, font.css, mainFontSizeInit, maxTextW);
  const subFontSize  = fitFontSize(ctx, subText,  font.style, font.weight, font.css, subFontSizeInit,  maxTextW);

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

// ─── Solar Panel Helper ──────────────────────────────────────────────────────
function drawSolarPanel(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, panW: number, panH: number,
) {
  ctx.save();
  ctx.fillStyle = '#1a2540';
  roundRect(ctx, x, y, panW, panH, 3);
  ctx.fill();
  ctx.strokeStyle = 'rgba(100, 140, 200, 0.4)';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  const cols = 5;
  const rows = 3;
  const pad = 2.5;
  const cellW = (panW - pad * (cols + 1)) / cols;
  const cellH = (panH - pad * (rows + 1)) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx2 = x + pad * (c + 1) + cellW * c;
      const cy2 = y + pad * (r + 1) + cellH * r;
      ctx.fillStyle = '#1e3d80';
      ctx.fillRect(cx2, cy2, cellW, cellH);
      ctx.fillStyle = 'rgba(100, 160, 240, 0.22)';
      ctx.fillRect(cx2, cy2, cellW * 0.45, cellH * 0.4);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 0.5;
  for (let r = 1; r < rows; r++) {
    const lineY = y + pad * (r + 0.5) + cellH * r;
    ctx.beginPath();
    ctx.moveTo(x + pad, lineY);
    ctx.lineTo(x + panW - pad, lineY);
    ctx.stroke();
  }
  ctx.restore();
}

// ─── Lightbox (Produk 3) Renderer ───────────────────────────────────────────
export function drawLightBox(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  jenis: JenisOption, font: FontOption,
  topCode: string, bottomCode: string,
) {
  ctx.clearRect(0, 0, W, H);
  const R = 14;
  const cx = W / 2;

  // ── Warm white luminous background ──
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0,    '#fffce8');
  bgGrad.addColorStop(0.15, '#fffff5');
  bgGrad.addColorStop(0.5,  '#ffffff');
  bgGrad.addColorStop(0.85, '#fffff5');
  bgGrad.addColorStop(1,    '#fffce8');
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 0, 0, W, H, R);
  ctx.fill();

  if (jenis.led) {
    // Internal radial glow — upper half
    ctx.save();
    const g1 = ctx.createRadialGradient(cx, H * 0.28, 0, cx, H * 0.28, W * 0.75);
    g1.addColorStop(0, 'rgba(255, 252, 218, 0.65)');
    g1.addColorStop(1, 'rgba(255, 248, 200, 0)');
    ctx.fillStyle = g1;
    roundRect(ctx, 0, 0, W, H, R);
    ctx.fill();
    ctx.restore();

    // Internal radial glow — lower half
    ctx.save();
    const g2 = ctx.createRadialGradient(cx, H * 0.76, 0, cx, H * 0.76, W * 0.75);
    g2.addColorStop(0, 'rgba(255, 252, 218, 0.65)');
    g2.addColorStop(1, 'rgba(255, 248, 200, 0)');
    ctx.fillStyle = g2;
    roundRect(ctx, 0, 0, W, H, R);
    ctx.fill();
    ctx.restore();

    // Top edge warm LED bleed
    ctx.save();
    const tGrad = ctx.createLinearGradient(0, 0, 0, H * 0.22);
    tGrad.addColorStop(0, 'rgba(255, 205, 70, 0.42)');
    tGrad.addColorStop(1, 'rgba(255, 205, 70, 0)');
    ctx.fillStyle = tGrad;
    roundRect(ctx, 0, 0, W, H, R);
    ctx.fill();
    ctx.restore();

    // Bottom edge warm LED bleed
    ctx.save();
    const bGrad = ctx.createLinearGradient(0, H, 0, H * 0.80);
    bGrad.addColorStop(0, 'rgba(255, 205, 70, 0.42)');
    bGrad.addColorStop(1, 'rgba(255, 205, 70, 0)');
    ctx.fillStyle = bGrad;
    roundRect(ctx, 0, 0, W, H, R);
    ctx.fill();
    ctx.restore();
  }

  // Plate border
  ctx.save();
  ctx.strokeStyle = 'rgba(185, 162, 100, 0.45)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 0.75, 0.75, W - 1.5, H - 1.5, R);
  ctx.stroke();
  ctx.restore();

  // ── Layout splits ──
  const solarTop = H * 0.42;
  const solarH   = H * 0.17;
  const solarBot = solarTop + solarH;

  const labelSize = Math.max(11, W * 0.09);
  const codeSize  = Math.max(26, W * 0.26);

  // Upper "BLOK" label
  ctx.save();
  ctx.font = `normal 700 ${labelSize}px "${font.css}"`;
  ctx.fillStyle = jenis.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BLOK', cx, solarTop * 0.26);
  ctx.restore();

  // Upper block code (e.g. "M1") — shrink-to-fit
  const maxCodeW = W - 24;
  const codeSizeTop = fitFontSize(ctx, topCode,    font.style, font.weight, font.css, codeSize, maxCodeW);
  const codeSizeBot = fitFontSize(ctx, bottomCode, font.style, font.weight, font.css, codeSize, maxCodeW);

  ctx.save();
  ctx.font = `${font.style} ${font.weight} ${codeSizeTop}px "${font.css}"`;
  ctx.fillStyle = jenis.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(topCode, cx, solarTop * 0.66);
  ctx.restore();

  // Solar band (black strip, edge-to-edge)
  ctx.save();
  ctx.fillStyle = '#111111';
  ctx.fillRect(0, solarTop, W, solarH);
  ctx.restore();

  // Solar panel inside strip
  const panW = W * 0.58;
  const panH = solarH * 0.62;
  const panX = cx - panW / 2;
  const panY = solarTop + (solarH - panH) / 2;
  drawSolarPanel(ctx, panX, panY, panW, panH);

  // Lower "NO" label
  const lowerH = H - solarBot;
  ctx.save();
  ctx.font = `normal 700 ${labelSize}px "${font.css}"`;
  ctx.fillStyle = jenis.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('NO', cx, solarBot + lowerH * 0.24);
  ctx.restore();

  // Lower house number (e.g. "01") — shrink-to-fit
  ctx.save();
  ctx.font = `${font.style} ${font.weight} ${codeSizeBot}px "${font.css}"`;
  ctx.fillStyle = jenis.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(bottomCode, cx, solarBot + lowerH * 0.67);
  ctx.restore();
}
