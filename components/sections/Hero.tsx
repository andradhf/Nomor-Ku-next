import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden">
      <div className="max-w-7xl pb-32 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10 order-2 md:order-1">
          <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container rounded-full text-[11px] font-medium tracking-[0.2em] uppercase mb-6">
            PREMIUM HOUSE NUMBER · AKRILO CREATIONS
          </span>
          <h1 className="font-headline text-5xl text-on-background leading-[1.1] tracking-tight mb-6">
            Rumah yang
            <br />
            Elegan
            <br />
            Dimulai dari
            <br />
            <span className="text-primary italic">Hal Pertama </span>
            yang Dilihat
          </h1>
          <p className="text-on-surface-variant/70 text-[15px] md:text-[16px] font-normal max-w-md mb-10 leading-relaxed">
          Sebelum tamu masuk ke dalam, mereka sudah menilai rumahmu. Nomor rumah akrilik premium kami bukan sekadar penanda — ini adalah pernyataan selera yang berbicara bahkan sebelum pintu terbuka.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/checkout" className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all">
              Coba Preview Desainmu Sekarang
            </Link>
            <Link href="#koleksi" className="px-8 py-4 border border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-container transition-all">
              Lihat Koleksi
            </Link>
          </div>
        </div>
        <div className="relative order-1 md:order-2 w-full h-[500px]">
          <div className="aspect-square rounded-full bg-surface-container-high absolute -top-10 -right-10 w-full h-full -z-10 blur-3xl opacity-50"></div>
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src="/images/foto_hero.png"
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
