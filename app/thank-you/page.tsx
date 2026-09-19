import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terima Kasih | NomorKu',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background px-6 pb-12 pt-28 flex items-center justify-center">
        <section
          aria-labelledby="thank-you-heading"
          className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-primary">
            <Mail className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1
            id="thank-you-heading"
            className="font-headline text-3xl leading-tight text-primary sm:text-4xl"
          >
            Terima kasih telah mengunjungi NomorKu.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
            Silakan cek email untuk informasi pesanan dan pembayaran Anda.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-on-primary transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
