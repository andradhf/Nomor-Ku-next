'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-headline text-2xl font-bold text-primary drop-shadow-sm hover:text-on-primary hover:drop-shadow-md transition-all duration-300">
          Cutting Custom
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#koleksi" className="font-headline tracking-tight text-lg text-primary drop-shadow-sm hover:text-on-primary hover:drop-shadow-md transition-all duration-300">
            Koleksi
          </Link>
          <Link href="/#cara-pesan" className="font-headline tracking-tight text-lg text-primary drop-shadow-sm hover:text-on-primary hover:drop-shadow-md transition-all duration-300">
            Cara Pesan
          </Link>
          <Link href="/#galeri" className="font-headline tracking-tight text-lg text-primary drop-shadow-sm hover:text-on-primary hover:drop-shadow-md transition-all duration-300">
            Galeri
          </Link>
          <Link href="/#testimoni" className="font-headline tracking-tight text-lg text-primary drop-shadow-sm hover:text-on-primary hover:drop-shadow-md transition-all duration-300">
            Testimoni
          </Link>
        </div>
        <Link
          href="/checkout"
          className="relative bg-primary text-on-primary px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:bg-primary-container scale-95 active:scale-100 flex items-center gap-2 group"
        >
          <i className="fa-solid fa-bag-shopping text-lg transition-transform duration-300 group-hover:scale-110" />
          <span>Keranjang</span>
        </Link>
      </div>
    </nav>
  );
}

