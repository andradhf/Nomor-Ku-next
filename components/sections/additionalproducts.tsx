import Image from 'next/image';
import Link from 'next/link';

export default function ProductHighlightCarousel() {
    // 1. Data array produk contoh
    const products = [
        {
            id: 1,
            title: "Acrylic Puzzle",
            description: "Abadikan momen spesial dalam bentuk puzzle akrilik interaktif.",
            imageSrc: "https://images.unsplash.com/photo-1512805147242-c3e794c14d69?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Custom Neon Flex",
            description: "Desain neon unik untuk bisnis atau dekorasi kamarmu.",
            imageSrc: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Personalized Gifts",
            description: "Dekorasi akrilik custom premium untuk sentuhan personal.",
            imageSrc: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Modern House Numbers",
            description: "Lempengan akrilik presisi untuk identitas hunian kontemporer.",
            imageSrc: "https://images.unsplash.com/photo-1610440042-bb443a5394b9?q=80&w=800&auto=format&fit=crop",
        }
    ];

    return (
        <section className="py-20 bg-background text-on-background">
            <div className="max-w-7xl mx-auto px-6">

                {/* Bagian Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-primary tracking-wide">
                            OUR COLLECTION
                        </h2>
                        <p className="text-on-surface-variant mt-2">
                            Eksplorasi Kreasi Akrilik Terbaik Kami
                        </p>
                    </div>

                    {/* Navigasi Kanan Atas - Link ke Halaman Baru */}
                    <Link href="/katalog" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                        Lihat Semua Koleksi <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>

                {/* Bagian Carousel (Grid) */}
                {/* Logika: grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] membuat grid responsif. 
           overflow-x-auto, whitespace-nowrap, snap-x, snap-mandatory membuat carousel geser.*/}
                <div className="grid grid-flow-col auto-cols-[calc(33.33333333%-1.5rem)] gap-8 overflow-x-auto whitespace-nowrap snap-x snap-mandatory py-6">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer snap-center"
                        >
                            {/* Gambar (Melayang di atas, tidak memenuhi layar) */}
                            <div className="absolute inset-0 bg-gray-950">
                                <img
                                    src={item.imageSrc}
                                    alt={item.title}
                                    // Logika Animasi Gambar (Zoom halus pada hover)
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                            </div>

                            {/* C. Kartu Putih Melayang - Ditambah efek Reveal */}
                            {/* Logika: absolute bottom-5 left-5 right-5 membuat kartu melayang. 
                 transition-all duration-300 agar mulus saat membesar. */}
                            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl py-4 px-5 shadow-xl text-center z-10 transition-all duration-300">
                                {/* Judul (Selalu tampil) */}
                                <p className="text-gray-900 font-semibold text-lg md:text-xl">
                                    {item.title}
                                </p>

                                {/* Deskripsi (Muncul saat hover dengan trik Grid) */}
                                {/* Logika: grid-rows-[0fr] membuat tingginya 0. Saat hover berubah jadi grid-rows-[1fr]. overflow-hidden disarankan. */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 mt-2">
                                    <div className="overflow-hidden">
                                        <p className="pt-2 text-sm text-gray-700 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}