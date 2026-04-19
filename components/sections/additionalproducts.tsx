'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { WA_NUMBER } from '../../app/checkout/constants';

export default function ProductHighlightCarousel() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handler(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      }
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const products = [
        {
            id: 1,
            title: "Kotak Mahar",
            description: "Sentuhan akrilik transparan dan hitam premium untuk tampilan yang lebih estetik dan berkelas.",
            imageSrc: "/images/kotak_mahar.png",
        },
        {
            id: 2,
            title: "Akrilik Custom Lembar (Bening)",
            description: "Lembaran Akrilik Bening Custom (2-5mm) – Potong Laser Presisi, Bebas Ukuran, Free Bubble Wrap!",
            imageSrc: "/images/akrilik_custom_bening.png",
        },
        {
            id: 3,
            title: "Papan Nama Akrilik LED",
            description: "Bikin logo dan nama brand kamu tampil makin modern dan profesional dengan Papan Nama Akrilik Custom LED.",
            imageSrc: "/images/papan_nama.png",
        },
        {
            id: 4,
            title: "BOTOL SPRAY PARFUM MINI",
            description: "Botol Spray Parfum Mini Travel Custom Nama – Sanrio Melody Lucu.  Botol mini model karakter Melody ini cocok banget buat kamu yang suka barang aesthetic sekaligus fungsional.",
            imageSrc: "/images/Botol_spray_parfume.png",
        }
    ];

    const handleOrder = () => {
      const product = selected ?? products[0];
      const msg = `Halo Kak, saya ingin bertanya tentang produk:\n\n*${product.title}*\nApakah tersedia? Terima kasih!`;
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section className="py-20 bg-background text-on-background" id='collections'>
            <div className="max-w-7xl mx-auto px-6">
                {/* Bagian Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-0">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-primary tracking-wide">
                            OUR COLLECTION
                        </h2>
                        <p className="text-on-surface-variant mt-2 text-sm md:text-base">
                            Eksplorasi Kreasi Akrilik Terbaik Kami
                        </p>
                    </div>
                </div>
                <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-1rem)] lg:auto-cols-[calc(33.33333333%-1.5rem)] gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory py-6">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer snap-center">
                            <div className="absolute inset-0 bg-gray-950">
                                <img
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            </div>
                            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl py-4 px-5 shadow-xl text-center z-10 transition-all duration-300">
                                <p className="text-gray-900 font-semibold text-lg md:text-xl">
                                    {item.title}
                                </p>
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 mt-2">
                                    <div className="overflow-hidden">
                                        <p className="pt-2 text-sm text-gray-700 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-10">
                  <div ref={ref} className="relative inline-flex">
                    
                    <div className="flex rounded-xl overflow-hidden shadow-md">
                      <button
                        onClick={handleOrder}
                        className="flex items-center gap-2 py-3 px-5 text-white text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#4B5564' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M11.99 2C6.47 2 2 6.473 2 11.99c0 1.762.466 3.414 1.28 4.844L2.005 22l5.332-1.254A9.96 9.96 0 0011.99 22C17.51 22 22 17.527 22 12.01 22 6.473 17.51 2 11.99 2z"/>
                        </svg>
                        Pesan WhatsApp
                      </button>

                      <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />

                      <button
                        onClick={() => setOpen(v => !v)}
                        className="flex items-center gap-2 py-3 px-4 text-white text-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#4B5564' }}
                      >
                        <span className="max-w-[140px] truncate">
                          {selected ? selected.title : 'Pilih Produk'}
                        </span>
                        <svg
                          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>

                    {open && (
                      <div className="absolute bottom-full mb-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                        <p className="text-xs text-gray-400 font-semibold px-3 pt-3 pb-1 uppercase tracking-wider">
                          Pilih Produk
                        </p>
                        {products.map(p => (
                          <button
                            key={p.id}
                            onClick={() => { setSelected(p); setOpen(false); }}
                            className={`w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                              selected?.id === p.id
                                ? 'bg-gray-100 text-gray-900 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${selected?.id === p.id ? 'bg-gray-700' : 'bg-gray-300'}`} />
                            {p.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

            </div>
        </section>
    );
}