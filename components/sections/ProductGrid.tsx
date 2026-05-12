'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const products = [
  {
    id: '1',
    badge: '⭐ BEST SELLER',
    name: 'Black Silver Portrait',
    desc: 'Kontras elegan hitam-silver untuk rumah cluster modern. Klasik yang tidak pernah salah.',
    price: 'Rp 150.000',
    imgSrc: '/images/produk_grid_norumah1.png'
  },
  {
    id: '2',
    badge: '✦ CLEAN MINIMAL',
    name: 'White Black Portrait',
    desc: 'Bersih, segar, dan modern. Cocok untuk rumah dengan konsep Scandinavian atau minimalis.',
    price: 'Rp 129.000',
    imgSrc: '/images/produk_grid_norumah2.png'
  },
  {
    id: '3',
    badge: '✦ PREMIUM PICK',
    name: 'LED Solar Panel Landscape',
    desc: 'Menyala otomatis saat malam. Rumah terlihat premium 24 jam — tanpa biaya listrik tambahan.',
    price: 'Rp 169.000',
    imgSrc: '/images/nomor_led_l.png'
  },
  {
    id: '4',
    badge: '✦ LUXURY EDITION',
    name: 'Golden Wood Edition',
    desc: 'Sentuhan emas bertemu tekstur kayu — untuk hunian yang ingin tampil mewah tanpa berlebihan.',
    price: 'Rp 138.000 - Rp 350.000',
    imgSrc: '/images/produk_led_box.png'
  }
];

export default function ProductGrid() {
  const router = useRouter();

  const handleSelectProduct = (productName: string, price: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('product', productName);
    searchParams.set('price', price);
    router.push(`/checkout?${searchParams.toString()}`);
  };

  const handleAddToCart = (id: string, title: string, price: string, imageSrc: string) => {
    const existingCart = JSON.parse(localStorage.getItem('acrylic_cart') || '[]');
    const rawPrice = parseInt(price.replace(/[^0-9]/g, ''));
    const existingItemIndex = existingCart.findIndex((item: any) => item.title === title);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ id, title, price: rawPrice, quantity: 1, imageSrc });
    }

    //localStorage.setItem('acrylic_cart', JSON.stringify(existingCart));
    router.push('/checkout');
  };
  return (
    <section className="py-24" id="koleksi">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">Koleksi Best Seller</p>
          <div className="w-8 h-px bg-on-surface-variant mx-auto mb-6" />
          <h3 className="font-headline text-4xl text-on-surface mb-6">Temukan Karakter Rumahmu</h3>
          <p className="text-on-surface-variant max-w-md mx-auto">Setiap model dirancang untuk arsitektur yang berbeda — mana yang paling mencerminkan rumahmu?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-surface-container-low p-4 rounded-[1.5rem] hover:bg-surface-bright transition-all duration-500">
              <div className="relative overflow-hidden rounded-xl mb-6 aspect-[4/5] bg-surface-variant">
                <Image
                  src={product.imgSrc}
                  alt={`${product.name} Design`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-1 px-2">{product.badge}</p>
              <h3 className="font-headline text-xl mb-2 px-2">{product.name}</h3>
              <p className="text-sm text-on-surface-variant mb-6 px-2">{product.desc}</p>
              <button
                onClick={() => handleAddToCart(
                  product.id,
                  product.name,
                  product.price,
                  product.imgSrc
                )}
                className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors"
              >
                Pilih Desain
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
