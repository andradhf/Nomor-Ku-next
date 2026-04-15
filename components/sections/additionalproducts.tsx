import Image from 'next/image';
import Link from 'next/link';

export default function ProductHighlightCarousel() {
    const products = [
        {
            id: 1,
            title: "Kotak Mahar",
            description: "Abadikan momen spesial dalam bentuk puzzle akrilik interaktif.",
            imageSrc: "/images/kotak_mahar.png",
        },
        {
            id: 2,
            title: "Akrilik Custom Lembar (Bening)",
            description: "Desain neon unik untuk bisnis atau dekorasi kamarmu.",
            imageSrc: "/images/akrilik_custom_bening.png",
        },
        {
            id: 3,
            title: "Papan Nama ",
            description: "Dekorasi akrilik custom premium untuk sentuhan personal.",
            imageSrc: "/images/papan_nama.png",
        },
        {
            id: 4,
            title: "Akrilik Custom Lembar (Hitam)",
            description: "Lempengan akrilik presisi untuk identitas hunian kontemporer.",
            imageSrc: "/images/akrilik_custom_hitam.png",
        }
    ];

    return (
        <section className="py-20 bg-background text-on-background">
            <div className="max-w-7xl mx-auto px-6">
                {/* Bagian Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-0">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-primary tracking-wide">
                            OUR COLLECTION
                        </h2>
                        <p className="text-on-surface-variant mt-2 text-sm md:text-base">
                            Eksplorasi Kreasi Akrilik Terbaik Kami
                        </p>
                    </div>
                    <Link href="/katalog" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit text-sm md:text-base">
                        Lihat Semua Koleksi <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-1rem)] lg:auto-cols-[calc(33.33333333%-1.5rem)] gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory py-6">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer snap-center">
                            <div className="absolute inset-0 bg-gray-950">
                                <img
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                            </div>
                            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl py-4 px-5 shadow-xl text-center z-10 transition-all duration-300">
                                <p className="text-gray-900 font-semibold text-lg md:text-xl">
                                    {item.title}
                                </p>
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