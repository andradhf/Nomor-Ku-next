import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-stone-100 dark:bg-stone-950 border-t border-stone-200/30 dark:border-stone-800/30 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        <div className="space-y-4">
          <p className="font-headline text-xl font-semibold text-stone-800 dark:text-stone-200">NomorKu</p>
          <p className="text-stone-700 dark:text-stone-300 font-body text-sm tracking-wide leading-relaxed">
            Menghadirkan keindahan dan detail presisi untuk setiap hunian. Estetika yang tak lekang oleh waktu.
          </p>
        </div>
        <div className="space-y-4">
          <p className="font-bold text-stone-900 dark:text-stone-50">Navigasi</p>
          <ul className="space-y-2 text-stone-500 dark:text-stone-400 font-body text-sm">
            <li><Link href="/" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Beranda</Link></li>
            <li><Link href="/#koleksi" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Produk</Link></li>
            <li><Link href="/#galeri" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Galeri</Link></li>
            <li><Link href="/#cara-pesan" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Cara Order</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="font-bold text-stone-900 dark:text-stone-50">Bantuan</p>
          <ul className="space-y-2 text-stone-500 dark:text-stone-400 font-body text-sm">
            <li><Link href="#" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Kebijakan Privasi</Link></li>
            <li><Link href="#" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Syarat & Ketentuan</Link></li>
            <li><Link href="#" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">FAQ</Link></li>
            <li><Link href="#" className="hover:text-stone-800 dark:hover:text-stone-200 underline underline-offset-4 transition-opacity">Hubungi Kami</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="font-bold text-stone-900 dark:text-stone-50">Ikuti Kami</p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">camera</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-200/30 dark:border-stone-800/30 text-center">
        <p className="text-stone-500 dark:text-stone-400 font-body text-sm">© {new Date().getFullYear()} NomorKu. Keindahan di Setiap Ambang Pintu.</p>
      </div>
    </footer>
  );
}
