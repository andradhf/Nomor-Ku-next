'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type FormData = { name: string; phone: string; address: string; notes: string };
type CartItem = { id: string; title: string; price: number; quantity: number; imageSrc: string };

export default function CheckoutPage() {
  const router = useRouter(); // <-- Inisialisasi router
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', address: '', notes: '' });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('acrylic_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('acrylic_cart', JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    updateCart(newCart);
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const formatRp = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Keranjang belanja Anda masih kosong!");

    const itemList = cart.map((item, index) =>
      `${index + 1}. ${item.title} (${item.quantity}x) - ${formatRp(item.price * item.quantity)}`
    ).join('\n');

    const message = `Halo Kak, saya ingin pesan produk ini :

*INFORMASI PEMESAN*
- Nama: ${formData.name}
- WA: ${formData.phone}
- Alamat: ${formData.address}
- Catatan Tambahan: ${formData.notes || '-'}

*RINGKASAN PESANAN*
${itemList}

*Total Pesanan: ${formatRp(total)}*

Mohon info untuk proses selanjutnya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waNumber = "62895355285094";
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!isLoaded) return <div className="min-h-screen bg-background pt-32 text-center">Memuat keranjang...</div>;

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header Halaman dengan Tombol Back */}
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm w-fit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali Belanja
            </button>

            <h1 className="font-headline text-4xl md:text-5xl text-gray-900 mb-4 text-center md:text-left">
              Selesaikan <span className="italic text-gray-600">Pesanan Anda</span>
            </h1>
            <p className="text-gray-500 max-w-2xl text-center md:text-left">
              Selesaikan pesanan akrilik kustom Anda. Pengrajin kami siap mulai mengerjakan desain pesanan Anda.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-3/5 space-y-10">
              <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</span>
                    <h2 className="text-xl font-bold text-gray-800">Informasi Kontak</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                      <input required type="text" placeholder="Johnathan Doe" className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
                      <input required type="tel" placeholder="+62 812..." className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">2</span>
                    <h2 className="text-xl font-bold text-gray-800">Pengiriman</h2>
                  </div>
                  <div className="pl-11">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea required rows={3} placeholder="Nama Jalan, RT/RW, Kecamatan, Kota, Kode Pos" className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">3</span>
                    <h2 className="text-xl font-bold text-gray-800">Catatan Tambahan</h2>
                  </div>
                  <div className="pl-11">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Catatan untuk Pesanan Anda (Opsional)</label>
                    <textarea rows={3} placeholder="Tentukan teks untuk setiap pesanan (misalnya Item 1: Nomor Rumah 42) atau permintaan desain umum." className="w-full p-4 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:w-2/5">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-serif text-gray-900 mb-6">Ringkasan Pesanan</h2>

                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    Keranjang Anda masih kosong. <br />
                    <button onClick={() => router.back()} className="text-blue-600 hover:underline mt-2 inline-block">Mulai Belanja</button>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-l-lg">-</button>
                              <span className="px-2 text-sm font-medium">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-100 rounded-r-lg">+</button>
                            </div>
                            <span className="font-bold text-blue-600 text-sm">{formatRp(item.price * item.quantity)}</span>
                          </div>
                        </div>

                        <button type="button" onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatRp(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Estimasi Pengiriman</span>
                    <span>{shippingFee === 0 ? 'Dihitung di WA' : formatRp(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                    <span>Total Pesanan</span>
                    <span className="text-blue-600">{formatRp(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={cart.length === 0}
                  className="w-full mt-8 py-4 bg-[#0056b3] text-white rounded-xl font-bold hover:bg-blue-800 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pesan via WhatsApp
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}