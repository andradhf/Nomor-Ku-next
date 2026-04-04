'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { buildWhatsAppUrl, generateWhatsAppMessage, WhatsAppFormData } from '@/lib/whatsapp';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product') || 'Nomor Rumah Akrilik';
  const price = searchParams.get('price') || '-';

  const [formData, setFormData] = useState<WhatsAppFormData>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generateWhatsAppMessage(product, price, formData);
    const url = buildWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface-container p-8 rounded-[2rem] shadow-sm mt-12">
      <h2 className="font-headline text-3xl mb-6">Informasi Pemesanan</h2>
      
      <div className="bg-surface-variant p-4 rounded-xl mb-8 flex justify-between items-center">
        <div>
          <p className="text-sm text-on-surface-variant">Produk Terpilih</p>
          <p className="font-bold text-lg">{product}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-on-surface-variant">Harga</p>
          <p className="font-bold text-lg text-primary">{price}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Nama Lengkap</label>
          <input
            type="text"
            required
            className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Nomor WhatsApp</label>
          <input
            type="tel"
            required
            className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Alamat Pengiriman Lengkap</label>
          <textarea
            required
            rows={3}
            className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none resize-none"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Nomor Rumah yang Dipesan & Catatan (Opsional)</label>
          <textarea
            rows={2}
            className="w-full p-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder="Contoh: No. 12 Blok A, minta font Serif"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container hover:text-on-primary-container transition-all flex justify-center items-center gap-2">
          <span className="material-symbols-outlined">send</span>
          Order via WhatsApp
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <Suspense fallback={<div className="text-center py-20">Memuat form pemesanan...</div>}>
            <CheckoutForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
