'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS, FONT_FAMILIES, drawPortrait, drawLandscape, drawLightBox, formatRp } from '../constants';
import { CartItem, FontOption } from '../types';

interface CustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export default function CustomizerSection({ onAddToCart }: CustomizerProps) {
  const [activeProduct, setActiveProduct] = useState<1 | 2 | 3>(1);
  const [jenisIdx, setJenisIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [familyIdx, setFamilyIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [mainText, setMainText] = useState('A/11');
  const [subText, setSubText] = useState('Citra Harmoni');
  const [fontsReady, setFontsReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const product = PRODUCTS[activeProduct];
  const jenis = product.jenis[jenisIdx];
  const size = product.sizes[sizeIdx];

  const activeFamily = FONT_FAMILIES[familyIdx];
  const activeVariant = activeFamily.variants[variantIdx] || activeFamily.variants[0];

  const font: FontOption = {
    id: activeVariant.id,
    label: `${activeFamily.label} ${activeVariant.label}`,
    css: activeFamily.css,
    weight: activeVariant.weight,
    style: activeVariant.style,
  };

  const CW = product.shape === 'portrait' ? 210 : product.shape === 'landscape' ? 380 : 190;
  const CH = product.shape === 'portrait' ? 360 : product.shape === 'landscape' ? 240 : 400;

  const parsedTop = product.shape === 'portrait'
    ? (mainText.includes('/') ? mainText.split('/')[0].trim() : mainText)
    : (mainText.includes('|') ? mainText : mainText.replace('/', '|'));
  const parsedBottom = product.shape === 'portrait' && mainText.includes('/')
    ? mainText.split('/')[1]?.trim() ?? ''
    : '';

  const imageKey = `${jenis.id}_${size.id}`;
  const realImgSrc = product.images[imageKey] ?? '';

  // ─── Load semua font lokal sekali saat mount ────────────────────────────────
  useEffect(() => {
    const fontsToLoad = [
      new FontFace('Garet', "url('/fonts/Garet-Book.woff2')", { weight: '400', style: 'normal' }),
      new FontFace('Garet', "url('/fonts/Garet-Heavy.woff2')", { weight: '900', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-ExtraLight.ttf')", { weight: '200', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-ExtraLightItalic.ttf')", { weight: '200', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-Light.ttf')", { weight: '300', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-LightItalic.ttf')", { weight: '300', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-Regular.ttf')", { weight: '400', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-Italic.ttf')", { weight: '400', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-Medium.ttf')", { weight: '500', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-MediumItalic.ttf')", { weight: '500', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-SemiBold.ttf')", { weight: '600', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-SemiBoldItalic.ttf')", { weight: '600', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-Bold.ttf')", { weight: '700', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-BoldItalic.ttf')", { weight: '700', style: 'italic' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-ExtraBold.ttf')", { weight: '800', style: 'normal' }),
      new FontFace('Plus Jakarta Sans', "url('/fonts/PlusJakartaSans-ExtraBoldItalic.ttf')", { weight: '800', style: 'italic' }),
    ];

    Promise.all(
      fontsToLoad.map(f =>
        f.load()
          .then(loaded => { document.fonts.add(loaded); })
          .catch(() => { })
      )
    ).then(() => setFontsReady(true));
  }, []);

  // ─── Render canvas setiap kali ada perubahan & font sudah siap ──────────────
  useEffect(() => {
    if (!fontsReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = CW;
    canvas.height = CH;

    if (product.shape === 'portrait') {
      drawPortrait(ctx, CW, CH, jenis, font, parsedTop, parsedBottom, subText);
    } else if (product.shape === 'landscape') {
      drawLandscape(ctx, CW, CH, jenis, font, parsedTop, subText);
    } else {
      drawLightBox(ctx, CW, CH, jenis, font, mainText, subText);
    }
  }, [fontsReady, activeProduct, jenisIdx, sizeIdx, familyIdx, variantIdx, mainText, subText, product.shape, jenis, font, parsedTop, parsedBottom, CW, CH]);

  const handleSwitchProduct = (n: 1 | 2 | 3) => {
    setActiveProduct(n);
    setJenisIdx(0);
    setSizeIdx(0);
    setMainText(n === 1 ? 'A/11' : n === 2 ? 'N10|32' : 'M1');
    setSubText(n === 1 ? 'Citra Harmoni' : n === 2 ? 'San Antonio' : '01');
  };

  const handleDisplayCart = () => {
    const item: CartItem = {
      id: Date.now(),
      name: `Nomor Rumah Akrilik ${activeProduct === 1 ? 'Portrait' : activeProduct === 2 ? 'Landscape LED' : 'Lightbox LED'}`,
      details: `- Jenis: ${jenis.label}\n- Size: ${size.label} (${size.dim})\n- Font: ${font.label}\n- Kode / Nomor: ${mainText}\n- Nama Perumahan: ${subText}`,
      price: size.price,
      imageSrc: realImgSrc,
      quantity: 1,
    };
    onAddToCart(item);
  };

  const displayW = product.shape === 'portrait' ? 158 : product.shape === 'landscape' ? 300 : 143;
  const displayH = product.shape === 'portrait' ? 270 : product.shape === 'landscape' ? 190 : 300;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/" className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer w-fit text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </Link>
        <div className="bg-gray-50 p-8 md:p-14 rounded-[3rem] shadow-sm">
          <h2 className="font-headline text-4xl mb-3">Visualisasikan Kreasi Anda</h2>
          <p className="text-gray-500 mb-10 max-w-xl">
            Kustomisasi nomor rumah akrilik Anda secara real-time — pilih jenis, ukuran, font, lalu masukkan teks Anda.
          </p>

          <div className="flex gap-3 mb-10">
            {([1, 2, 3] as const).map(n => (
              <button key={n} onClick={() => handleSwitchProduct(n)}
                className={`flex-1 py-3 px-4 rounded-xl border font-semibold text-sm transition-all ${activeProduct === n
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                {n === 1 ? 'Produk 1 — Portrait' : n === 2 ? 'Produk 2 — Landscape LED' : 'Produk 3 — Lightbox LED'}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-5/12 space-y-6">
              {product.jenis.length > 1 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Jenis</label>
                  <div className="flex flex-wrap gap-2">
                    {product.jenis.map((j, i) => (
                      <button key={j.id} onClick={() => setJenisIdx(i)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${jenisIdx === i
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                          }`}>{j.label}</button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button key={s.id} onClick={() => setSizeIdx(i)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${sizeIdx === i
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}>
                      {s.label}
                      <span className="ml-1.5 text-xs opacity-60">{s.dim}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Keluarga Font</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {FONT_FAMILIES.map((fam, i) => (
                    <button key={fam.id}
                      onClick={() => { setFamilyIdx(i); setVariantIdx(0); }}
                      style={{ fontFamily: fam.css }}
                      className={`px-4 py-2 rounded-lg border text-sm transition-all ${familyIdx === i
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}>{fam.label}</button>
                  ))}
                </div>

                {activeFamily.variants.length > 0 && (
                  <>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Gaya / Ketebalan Font</label>
                    <div className="flex flex-wrap gap-2">
                      {activeFamily.variants.map((v, i) => (
                        <button key={v.id} onClick={() => setVariantIdx(i)}
                          style={{ fontFamily: activeFamily.css, fontWeight: v.weight, fontStyle: v.style }}
                          className={`px-4 py-2 rounded-lg border text-sm transition-all ${variantIdx === i
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                            }`}>{v.label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {product.shape === 'portrait'
                    ? 'Kode / Nomor — gunakan "/" untuk pemisah baris (contoh: A/11, F/18)'
                    : product.shape === 'landscape'
                    ? 'Kode / Nomor — gunakan "|" untuk pemisah (contoh: N10|32, A2|09)'
                    : 'Kode Blok — contoh: M1, A2, B5'}
                </label>
                <input type="text" value={mainText} onChange={e => setMainText(e.target.value)}
                  maxLength={10}
                  placeholder={product.shape === 'portrait' ? 'A/11' : product.shape === 'landscape' ? 'N10|32' : 'M1'}
                  className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {product.shape === 'lightbox' ? 'Nomor Rumah — contoh: 01, 23, 09' : 'Nama Perumahan / Sub-teks'}
                </label>
                <input type="text" value={subText} onChange={e => setSubText(e.target.value)}
                  maxLength={30} placeholder={product.shape === 'lightbox' ? '01' : 'Citra Harmoni'}
                  className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm" />
              </div>

              <div className="pt-1">
                <p className="text-sm text-gray-500 mb-3">
                  Harga: <span className="text-gray-900 font-bold text-xl">{formatRp(size.price)}</span>
                </p>
                <button onClick={handleDisplayCart}
                  className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                      d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>

            <div className="lg:w-7/12 w-full space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Preview Real-time</p>
                <div className="bg-white rounded-2xl border border-gray-100 p-10 flex items-center justify-center"
                  style={{ minHeight: product.shape === 'portrait' ? 320 : 260 }}>
                  {!fontsReady ? (
                    <p className="text-xs text-gray-400">Memuat font...</p>
                  ) : (
                    <canvas ref={canvasRef}
                      style={{
                        width: displayW,
                        height: displayH,
                        imageRendering: 'auto',
                        ...(activeProduct === 2 && jenis.led ? {
                          boxShadow: `
                                0 0 18px 6px rgba(210, 180, 90, 0.55),
                                0 0 40px 14px rgba(200, 165, 70, 0.35),
                                0 0 70px 24px rgba(190, 150, 50, 0.18)
                                `,
                          borderRadius: '10px',
                        } : activeProduct === 3 && jenis.led ? {
                          boxShadow: `
                                0 -10px 28px 6px rgba(215, 175, 60, 0.52),
                                0 10px 28px 6px rgba(215, 175, 60, 0.48),
                                0 -22px 50px 12px rgba(200, 160, 50, 0.3),
                                0 22px 50px 12px rgba(200, 160, 50, 0.28)
                                `,
                          borderRadius: '12px',
                        } : {}),
                      }}
                      className="transition-all duration-500" />

                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Foto Produk — {jenis.label} (klik untuk pilih ukuran)
                </p>
                <div className="grid gap-3 grid-cols-3">
                  {product.sizes.map((s, si) => {
                    const key = `${jenis.id}_${s.id}`;
                    const src = product.images[key] ?? '';
                    const isSelected = si === sizeIdx;
                    return (
                      <button key={s.id} onClick={() => setSizeIdx(si)}
                        className={`rounded-xl overflow-hidden border-2 transition-all text-left ${isSelected
                          ? 'border-gray-900 shadow-md'
                          : 'border-transparent opacity-55 hover:opacity-80 hover:border-gray-300'
                          }`}>
                        <div className={`w-full bg-gray-200 overflow-hidden ${product.shape === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                          {src ? (
                            <img src={src} alt={`${jenis.label} ${s.label}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ background: jenis.bg }}>
                              <span style={{ color: jenis.textColor, fontSize: 12, fontWeight: 600 }}>{s.label}</span>
                            </div>
                          )}
                        </div>
                        <div className={`text-center py-1.5 text-xs font-bold ${isSelected ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {s.label} — {s.dim}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  * Foto untuk referensi. Teks pada produk aktual sesuai input kamu di atas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}