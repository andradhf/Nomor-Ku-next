'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const catalogData = [
  {
    id: 1,
    title: "Nomor Rumah Akrilik (Black Silver)",
    description: "Nomor rumah",
    price: "Rp 150.000",
    category: "Nomor Rumah",
    imageSrc: "/images/black_silver_l.png",
    sizes: [
      { label: "M", price: "Rp 150.000" },
      { label: "L", price: "Rp 200.000" },
      { label: "XL", price: "Rp 250.000" },
    ]
  },
  {
    id: 2,
    title: "Nomor Rumah Akrilik (Black Frosted)",
    description: "Hand-polished monolithic trophy with high-clarity refractor edges.",
    price: "Rp 450.000",
    category: "Nomor Rumah",
    imageSrc: "/images/blackfrosted_xl.png",
    sizes: [
      { label: "M", price: "Rp 350.000" },
      { label: "L", price: "Rp 400.000" },
      { label: "XL", price: "Rp 450.000" },
    ]
  },
  {
    id: 3,
    title: "Nomor Rumah Akrilik (White Black)",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Nomor Rumah",
    imageSrc: "/images/whiteblack_m.png",
    sizes: [
      { label: "M", price: "Rp 250.000" },
      { label: "L", price: "Rp 300.000" },
      { label: "XL", price: "Rp 350.000" },
    ]
  },
  {
    id: 4,
    title: "Nomor Rumah Akrilix LED (L)",
    description: "Corporate door signage panel with premium brushed steel hardware.",
    price: "Rp 350.000",
    category: "Nomor Rumah",
    imageSrc: "/images/nomor_led_l.png",
  },
  {
    id: 5,
    title: "Nomor Rumah Akrilix LED (M)",
    description: "Precision mirrored acrylic toppers for celebratory centerpieces.",
    price: "Rp 85.000",
    category: "Nomor Rumah",
    imageSrc: "/images/nomor_led_m.png",
  },
  {
    id: 6,
    title: "Nomor Rumah Akrilix LED (S)",
    description: "Double-panel UV-resistant acrylic with magnetic edge closure.",
    price: "Rp 210.000",
    category: "Nomor Rumah",
    imageSrc: "/images/nomor_led_s.png",
  },
  {
    id: 7,
    title: "Papan Nama Akrilik (Hitam/Putih)",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Papan Nama",
    imageSrc: "/images/papan_nama.png",
    sizes: [
      { label: "30x30", price: "Rp 250.000" },
      { label: "35x35", price: "Rp 300.000" },
      { label: "40x40", price: "Rp 350.000" },
      { label: "50x50", price: "Rp 350.000" },
      { label: "60x60", price: "Rp 350.000" },
      { label: "70x70", price: "Rp 350.000" },
      { label: "80x80", price: "Rp 350.000" },
    ]
  },
  {
    id: 8,
    title: "Papan Nama Akrilik (Warna)",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Papan Nama",
    imageSrc: "/images/papan_nama_warna.png",
    sizes: [
      { label: "30x30", price: "Rp 250.000" },
      { label: "35x35", price: "Rp 300.000" },
      { label: "40x40", price: "Rp 350.000" },
      { label: "50x50", price: "Rp 350.000" },
      { label: "60x60", price: "Rp 350.000" },
    ]
  },
  {
    id: 9,
    title: "Kotak Mahar",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Kotak mahar",
    imageSrc: "/images/kotak_mahar.png",
    sizes: [
      { label: "40x30x6", price: "Rp 250.000" },
      { label: "30x30x6", price: "Rp 300.000" },
      { label: "25x30x6", price: "Rp 350.000" },
    ]
  },
  {
    id: 10,
    title: "Akrilik Custom Bening",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Akrilik Custom",
    imageSrc: "/images/akrilik_custom_bening.png",
  },
  {
    id: 11,
    title: "Akrilik Custom Hitam",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Akrilik Custom",
    imageSrc: "/images/akrilik_custom_hitam.png",
  },
  {
    id: 12,
    title: "Akrilik Custom Putih",
    description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.",
    price: "Rp 250.000",
    category: "Akrilik Custom",
    imageSrc: "/images/akrilik_custom_putih.png",
  },
];

const categories = ["All Collections", "Nomor Rumah", "Kotak mahar", "Akrilik Custom"];

function ProductCard({ product, onAddToCart }: {
  product: typeof catalogData[0];
  onAddToCart: (product: typeof catalogData[0], selectedSize?: { label: string; price: string }) => void;
}) {
  const hasSizes = product.sizes && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState(hasSizes ? product.sizes![0] : null);

  const displayPrice = selectedSize ? selectedSize.price : product.price;

  return (
    <div className="group flex flex-col">
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-surface-variant p-4">
        <img
          src={product.imageSrc}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="font-headline font-bold text-lg text-on-background mb-1">{product.title}</h3>
      <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">{product.description}</p>

      {/* Tombol pilih size — hanya muncul di produk yang punya sizes */}
      {hasSizes && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Size:</span>
          <div className="grid grid-cols-3 gap-1">
            {product.sizes!.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all duration-200 ${
                  selectedSize?.label === size.label
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-transparent text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
        {/* Harga berubah sesuai size yang dipilih */}
        <span className="font-bold text-primary transition-all duration-200">{displayPrice}</span>
        <button
          onClick={() => onAddToCart(product, selectedSize ?? undefined)}
          className="px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors"
        >
          Add to Cart & Order
        </button>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Collections");

  const filteredProducts = activeFilter === "All Collections"
    ? catalogData
    : catalogData.filter(item => item.category === activeFilter);

  const handleAddToCart = (
    product: typeof catalogData[0],
    selectedSize?: { label: string; price: string }
  ) => {
    const existingCart = JSON.parse(localStorage.getItem('acrylic_cart') || '[]');

    // Pakai harga size yang dipilih, atau harga default kalau tidak ada size
    const priceStr = selectedSize ? selectedSize.price : product.price;
    const rawPrice = parseInt(priceStr.replace(/[^0-9]/g, ''));

    // Judul di keranjang menyertakan size supaya bisa dibedakan
    const cartTitle = selectedSize
      ? `${product.title} - ${selectedSize.label}`
      : product.title;

    const existingItemIndex = existingCart.findIndex((item: any) => item.title === cartTitle);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: `${product.id}-${selectedSize?.label ?? 'default'}`,
        title: cartTitle,
        price: rawPrice,
        quantity: 1,
        imageSrc: product.imageSrc
      });
    }

    localStorage.setItem('acrylic_cart', JSON.stringify(existingCart));
    router.push('/checkout');
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl text-on-background mb-4">Collections</h1>
              <p className="text-on-surface-variant max-w-2xl">Explore our curated selection of handcrafted acrylic masterpieces. Each piece is laser-cut with precision and hand-polished to achieve unparalleled clarity.</p>
            </div>
            <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-surface-variant transition-colors text-on-background font-medium text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mr-4">Filter By :</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface-variant text-on-surface-variant hover:bg-outline-variant/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}