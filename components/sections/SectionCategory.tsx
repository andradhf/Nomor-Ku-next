import Image from 'next/image';
export default function MasterpiecesSection() {
    // Tambahkan 'description' ke dalam data array
    const masterpieces = [
        {
            id: 1,
            title: "Rumah Cluster",
            description: "Nomor rumah yang jelas dan rapi. Alamat mudah ditemukan, lingkungan makin tertata.",
            imageSrc: "/images/rumah_cluster.png",
        },
        {
            id: 2,
            title: "Villa & Guest House",
            description: "Nomor rumah eksklusif dan elegan. Tamu langsung menemukan lokasi dengan kesan premium.",
            imageSrc: "/images/villa.png",
        },
        {
            id: 3,
            title: "Hunian Pribadi",
            description: "Nomor rumah simpel dan estetik. Menyatu sempurna dengan tampilan modern rumahmu.",
            imageSrc: "/images/rumah_pribadi.png",
        }
    ];

    return (
        <section className="py-16 bg-background">
            <div className="max-w-6xl mx-auto px-6">

                {/* Bagian Header */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-[36px] font-bold text-3xl md:text-4xl font-serif text-primary">
                        CRAFTED FOR YOUR HOME
                    </h2>

                    {/* Garis pemisah dengan titik */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-[1px] w-12 bg-blue-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                        <div className="h-[1px] w-12 bg-blue-200"></div>
                    </div>

                    <p className="text-[18px] font-medium text-gray-500 text-sm md:text-base">
                        Bukan sekadar angka — ini identitas rumahmu.
                    </p>
                </div>

                {/* Bagian Grid Kartu */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {masterpieces.map((item) => (
                        <div
                            key={item.id}
                            // Pastikan class 'group' ada di sini (sudah ada dari kodemu)
                            className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                        >
                            {/* Gambar dari URL Online */}
                            <div className="absolute inset-0 bg-gray-900">
                                <img
                                    src={item.imageSrc}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                            </div>

                            {/* Label Putih Melayang - Ditambah efek Reveal */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg py-3 px-4 shadow-md text-center z-10 transition-all duration-300">
                                {/* Judul (Selalu tampil) */}
                                <p className="text-gray-800 font-semibold text-sm md:text-base">
                                    {item.title}
                                </p>

                                {/* Deskripsi (Muncul saat hover dengan trik Grid) */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                    <div className="overflow-hidden">
                                        <p className="pt-2 text-xs text-gray-600 leading-relaxed">
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