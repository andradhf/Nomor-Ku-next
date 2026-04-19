'use client';

import { useState } from 'react';
import { formatRp, WA_NUMBER } from '../constants';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  cartTotal: number;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
}

export default function CheckoutSection({ cart, cartTotal, updateQty, removeItem }: CheckoutProps) {
  const [formData,  setFormData]  = useState({ name: '', phone: '', address: '', notes: '' });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) return;
    const lines = cart.map((item, idx) =>
      `${idx + 1}. ${item.name}\n${item.details}\n- Qty: ${item.quantity}x — ${formatRp(item.price * item.quantity)}`
    ).join('\n\n');

    const msg =
      `Halo Kak, saya ingin memesan nomor rumah akrilik:\n\n` +
      `*INFORMASI PEMESAN*\n- Nama: ${formData.name}\n- WA: ${formData.phone}\n- Alamat: ${formData.address}\n- Catatan: ${formData.notes || '-'}\n\n` +
      `*RINGKASAN PESANAN*\n${lines}\n\n` +
      `*Total Pesanan: ${formatRp(cartTotal)}*\n\nMohon info untuk proses selanjutnya, terima kasih!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="pb-24 min-h-screen bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 pt-10">
          <h1 className="font-headline text-4xl md:text-5xl text-gray-900 mb-4">
            Checkout <span className="italic text-gray-600">Now</span>
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Satu langkah lagi! Selesaikan pesananmu sekarang dan tim kami siap mewujudkan desain akrilik impianmu jadi nyata.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="lg:w-3/5 space-y-10">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              {/* 1. Informasi Kontak */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</span>
                  <h2 className="text-xl font-bold text-gray-800">Informasi Kontak</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input required type="text" placeholder="Johnathan Doe"
                      className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
                    <input required type="tel" placeholder="+62 812..."
                      className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* 2. Pengiriman */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">2</span>
                  <h2 className="text-xl font-bold text-gray-800">Pengiriman</h2>
                </div>
                <div className="pl-11">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
                  <textarea required rows={3}
                    placeholder="Nama Jalan, RT/RW, Kecamatan, Kota, Kode Pos"
                    className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                </div>
              </div>

              {/* 3. Catatan */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">3</span>
                  <h2 className="text-xl font-bold text-gray-800">Catatan Tambahan</h2>
                </div>
                <div className="pl-11">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan untuk Pesanan Anda (Opsional)</label>
                  <textarea rows={3}
                    placeholder="Tentukan teks untuk setiap pesanan (misalnya Item 1: Nomor Rumah 42) atau permintaan desain umum."
                    className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Ringkasan Pesanan</h2>

              {cart.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">
                  Keranjang Anda masih kosong.<br />
                  <span className="text-blue-600 cursor-pointer hover:underline mt-2 inline-block"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Mulai Belanja ↑
                  </span>
                </div>
              ) : (
                <div className="space-y-5 max-h-[400px] overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        {item.imageSrc ? (
                          <img src={item.imageSrc} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">foto</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.name}</h3>
                        <div className="text-xs text-gray-500 mt-1.5 whitespace-pre-line leading-relaxed">
                          {item.details}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button type="button" onClick={() => updateQty(item.id, -1)}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-l-lg">−</button>
                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                            <button type="button" onClick={() => updateQty(item.id, 1)}
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-r-lg">+</button>
                          </div>
                          <span className="font-bold text-blue-600 text-sm">{formatRp(item.price * item.quantity)}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span><span>{formatRp(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimasi Pengiriman</span><span>Dihitung di WA</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total Pesanan</span>
                  <span className="text-blue-600">{formatRp(cartTotal)}</span>
                </div>
              </div>

              <button type="submit" form="checkout-form"
                disabled={cart.length === 0}
                className="w-full mt-8 py-4 bg-[#0056b3] text-white rounded-xl font-bold hover:bg-blue-800 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                Pesan via WhatsApp
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
