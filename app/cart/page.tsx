'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { formatRp } from '@/app/checkout/constants';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen" />
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="font-headline text-2xl mb-2">Keranjang kosong</h2>
            <p className="text-gray-500 mb-8">Belum ada produk yang ditambahkan ke keranjang.</p>
            <Link
              href="/checkout"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
              Mulai Kustomisasi
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-headline text-3xl">Keranjang Belanja</h1>
            <Link href="/checkout" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              + Tambah produk
            </Link>
          </div>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.item_code} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 items-start">
                {item.image && (
                  <div className="w-16 h-20 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.item_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
                    {item.item_name}
                  </h3>
                  {item.customization && (
                    <div className="text-xs text-gray-500 space-y-0.5 mb-3">
                      {Object.entries(item.customization).map(([k, v]) => (
                        <p key={k}>
                          <span className="font-medium capitalize">{k}:</span>{' '}
                          {String(v)}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 py-1">
                      <button
                        onClick={() => updateQuantity(item.item_code, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.item_code, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white transition-colors"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    {item.price != null && (
                      <p className="font-bold text-gray-900 text-sm">
                        {formatRp(item.price * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.item_code)}
                  className="p-2 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                  aria-label="Hapus produk"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500">{totalItems} produk</p>
              {totalPrice > 0 && (
                <p className="text-xl font-bold">{formatRp(totalPrice)}</p>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Harga belum termasuk ongkos kirim
            </p>
            <Link
              href="/checkout-form"
              className="block w-full text-center bg-gray-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-gray-700 transition-colors"
            >
              Lanjut ke Checkout
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
