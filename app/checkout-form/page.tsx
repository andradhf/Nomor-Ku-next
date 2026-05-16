'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { API_ENDPOINTS } from '@/lib/api';
import { formatRp } from '@/app/checkout/constants';

interface FormState {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

interface Step1Data {
  success: boolean;
  phone: string;
  user_id: number;
  erp_customer: string;
}

function isValidPhone(phone: string): boolean {
  return /^(\+62|08)\d{8,13}$/.test(phone.replace(/[\s\-()]/g, ''));
}

export default function CheckoutFormPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>({ fullName: '', phone: '', address: '', notes: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Memproses pesanan Anda...');
  const [apiError, setApiError] = useState<string | null>(null);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace('/cart');
    }
  }, [mounted, items.length, router]);

  const totalPrice = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (form.fullName.trim().length < 3) next.fullName = 'Nama minimal 3 karakter';
    if (!isValidPhone(form.phone)) next.phone = 'Format tidak valid — gunakan 08xx atau +62xx (10–15 digit)';
    if (form.address.trim().length < 10) next.address = 'Alamat minimal 10 karakter';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !captchaToken) return;

    setApiError(null);
    setIsLoading(true);

    // ── Step 1: Register user (skip if already done) ────────────────────────
    let userData = step1Data;

    if (!userData) {
      setLoadingMsg('Mendaftarkan pengguna...');
      try {
        const res = await fetch(API_ENDPOINTS.userInitiate, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Captcha-Token': captchaToken,
          },
          body: JSON.stringify({
            user: {
              name: form.fullName.trim(),
              phone: form.phone.trim(),
              address: form.address.trim(),
              ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
            },
          }),
        });
        const data = await res.json().catch(() => ({})) as Partial<Step1Data> & { message?: string };
        if (!res.ok || !data.success) {
          setApiError(data.message ?? 'Gagal mendaftar. Silakan coba lagi.');
          setCaptchaToken(null);
          setCaptchaKey((k) => k + 1);
          setIsLoading(false);
          return;
        }
        userData = data as Step1Data;
        setStep1Data(userData);
      } catch {
        setApiError('Terjadi kesalahan jaringan. Periksa koneksi Anda dan coba lagi.');
        setIsLoading(false);
        return;
      }
    }

    // ── Step 2: Initiate payment ────────────────────────────────────────────
    setLoadingMsg('Membuat link pembayaran...');
    try {
      const cartItems = useCartStore.getState().items.map((i) => ({
        item_code: i.item_code,
        item_name: i.item_name,
        quantity: i.quantity,
        content: [
          {
            item_numbers: (i.customization?.item_numbers as string) ?? '',
            item_address: (i.customization?.item_address as string) ?? '',
            item_style: [
              {
                Item_font: (i.customization?.font_family as string) ?? '',
                Font_style: (i.customization?.font_style as string) ?? '',
              },
            ],
          },
        ],
      }));

      const res = await fetch(API_ENDPOINTS.paymentInitiate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: userData.phone, items: cartItems }),
      });
      const data = await res.json().catch(() => ({})) as Record<string, unknown> & { message?: string };
      if (!res.ok) {
        setApiError(data.message ?? 'Gagal memproses pembayaran. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }
      const redirectUrl =
        (data.invoice_url as string | undefined) ??
        (data.redirect_url as string | undefined) ??
        (data.payment_url as string | undefined) ??
        null;

      if (!redirectUrl) {
        setApiError('URL pembayaran tidak ditemukan. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      clearCart();
      window.location.href = redirectUrl;
    } catch {
      setApiError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
      setIsLoading(false);
    }
  }

  if (!mounted || items.length === 0) return null;

  const canSubmit = !!captchaToken && !isLoading;

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-medium text-gray-900">{loadingMsg}</p>
          </div>
        </div>
      )}

      <Header />
      <main className="pt-20 min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="font-headline text-3xl mb-2">Checkout</h1>
          <p className="text-gray-500 mb-10">
            Lengkapi data di bawah untuk melanjutkan ke pembayaran.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm ${
                    errors.fullName
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 bg-white focus:border-gray-900'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="08xx atau +62xx"
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm ${
                    errors.phone
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 bg-white focus:border-gray-900'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Alamat Pengiriman <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Jalan, nomor, RT/RW, kelurahan, kecamatan, kota"
                  className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm resize-none ${
                    errors.address
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 bg-white focus:border-gray-900'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Catatan{' '}
                  <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value.slice(0, 500))}
                  placeholder="Pesan khusus atau instruksi pengiriman"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm resize-none"
                />
                <p className="mt-1 text-xs text-gray-400 text-right">
                  {form.notes.length}/500
                </p>
              </div>

              <div>
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    key={captchaKey}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)}
                    onError={() => setCaptchaToken(null)}
                    onExpire={() => {
                      setCaptchaToken(null);
                      setCaptchaKey((k) => k + 1);
                    }}
                  />
                ) : (
                  <p className="text-xs text-red-500 p-3 bg-red-50 rounded-xl border border-red-200">
                    Konfigurasi captcha belum ditemukan. Tambahkan{' '}
                    <code className="font-mono">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> ke{' '}
                    <code className="font-mono">.env.local</code> lalu restart server.
                  </p>
                )}
              </div>

              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {step1Data && (
                    <p className="font-semibold mb-1">
                      Langkah 1 berhasil — gagal di pembayaran:
                    </p>
                  )}
                  {apiError}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step1Data ? 'Coba Lagi — Buat Pembayaran' : 'Lanjut ke Pembayaran'}
              </button>
            </form>

            {/* ── Order Summary ── */}
            <div className="lg:w-80 w-full">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:sticky lg:top-28">
                <h2 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.item_code} className="flex gap-3 items-start">
                      {item.image && (
                        <div className="w-12 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.item_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 leading-tight">
                          {item.item_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                        {item.price != null && (
                          <p className="text-sm font-bold text-gray-900 mt-0.5">
                            {formatRp(item.price * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {totalPrice > 0 && (
                  <>
                    <hr className="border-gray-100 mb-3" />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="font-bold text-lg">{formatRp(totalPrice)}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      Belum termasuk ongkos kirim
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
