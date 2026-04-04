'use client';

import { useState } from 'react';

type FontOption = {
  id: string;
  label: string;
  numClass: string;
  txtClass: string;
};

type ColorOption = {
  id: string;
  bgClass: string;
  mainTextClass: string;
  subTextClass: string;
  btnHoverClass: string;
};

const fontOptions: FontOption[] = [
  { id: 'serif', label: 'Serif', numClass: 'font-headline', txtClass: 'font-headline' },
  { id: 'modern', label: 'Modern', numClass: 'font-body', txtClass: 'font-body' },
  { id: 'script', label: 'Script', numClass: 'italic font-headline', txtClass: 'font-headline' },
];

const colorOptions: ColorOption[] = [
  { id: 'black', bgClass: 'bg-stone-900', mainTextClass: 'text-stone-100', subTextClass: 'text-stone-300', btnHoverClass: 'bg-stone-900' },
  { id: 'primary', bgClass: 'bg-primary', mainTextClass: 'text-white', subTextClass: 'text-stone-300', btnHoverClass: 'bg-primary' },
  { id: 'secondary', bgClass: 'bg-secondary', mainTextClass: 'text-white', subTextClass: 'text-stone-300', btnHoverClass: 'bg-secondary' },
  { id: 'tertiary', bgClass: 'bg-tertiary-fixed', mainTextClass: 'text-on-tertiary-fixed', subTextClass: 'text-on-tertiary-fixed-variant', btnHoverClass: 'bg-tertiary-fixed' },
  { id: 'white', bgClass: 'bg-white', mainTextClass: 'text-on-background', subTextClass: 'text-stone-500', btnHoverClass: 'bg-white border border-outline-variant' },
];

export default function CustomizationPreviewer() {
  const [selectedFont, setSelectedFont] = useState<FontOption>(fontOptions[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0]);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-surface-container p-8 md:p-16 rounded-[3rem] shadow-sm flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="font-headline text-4xl mb-6">Visualisasikan Kreasi Anda</h2>
            <p className="text-on-surface-variant mb-10">Gunakan Acrylic Previewer kami untuk melihat bagaimana nomor rumah Anda tampil dalam berbagai pilihan font dan material.</p>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-4">Pilih Font</label>
                <div className="flex gap-4">
                  {fontOptions.map(font => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={`flex-1 py-3 border border-outline rounded-lg transition-all ${font.numClass} ${
                        selectedFont.id === font.id ? 'bg-surface-variant shadow-inner' : 'bg-surface hover:bg-surface-variant'
                      }`}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-4">Pilih Warna</label>
                <div className="flex gap-4">
                  {colorOptions.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all ${color.btnHoverClass} ${
                        selectedColor.id === color.id ? 'ring-primary scale-110' : 'ring-transparent active:ring-primary'
                      }`}
                      aria-label={`Select ${color.id} color`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className={`w-full max-w-[400px] aspect-video flex flex-col items-center justify-center rounded-2xl shadow-2xl transition-all duration-500 relative ${selectedColor.bgClass}`}>
              <div className="absolute inset-0 acrylic-blur rounded-2xl opacity-10"></div>
              <span className={`text-7xl relative z-10 transition-all duration-300 ${selectedFont.numClass} ${selectedColor.mainTextClass}`}>
                No. 12
              </span>
              <span className={`text-xl relative z-10 tracking-widest uppercase mt-2 transition-all duration-300 ${selectedFont.txtClass} ${selectedColor.subTextClass}`}>
                Graha Asri
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
