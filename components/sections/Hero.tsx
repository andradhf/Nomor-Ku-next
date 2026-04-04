import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10 order-2 md:order-1">
          <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Handcrafted Premium Acrylic
          </span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-background leading-tight tracking-tight mb-6">
            Sambut Tamu dengan Kesan Pertama yang <span className="text-primary italic">Hangat</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md mb-10 leading-relaxed">
            Ubah fasad rumah Anda menjadi karya seni minimalis. Nomor rumah custom dengan material premium yang tahan segala cuaca.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#koleksi" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all">
              Lihat Koleksi
            </Link>
            <Link href="#cara-pesan" className="px-8 py-4 border border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-container transition-all">
              Cara Kerja
            </Link>
          </div>
        </div>
        <div className="relative order-1 md:order-2 w-full h-[500px]">
          <div className="aspect-square rounded-full bg-surface-container-high absolute -top-10 -right-10 w-full h-full -z-10 blur-3xl opacity-50"></div>
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB54NO83SbnyeYXc1X-BfkLVnaDIEtIoWMFMCvmtH4zZ-_ZmJux5C7-daoudOL131QGdTmelQ9PMSRoJ3KA1MOuabAiHwNmtMs8RO7RsA49ZdXLXOT4Gr2qOCxtWAur7VXuqIIeIIBLxYgWLgjP-duu1KvayEwsDxtAg5PT01kGaXbP6nCzGhDk45yM2ZrerN0GKziEZgpuKaauG2XHyIVkWF_5G0tbRjHmcMaT4rcwyh_IKVXBQGS5fIkwlbpBEVKmyjRe4_UcyPQ"
              alt="Premium House Number Mockup"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
