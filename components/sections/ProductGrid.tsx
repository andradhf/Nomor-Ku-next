'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const products = [
  {
    id: '1',
    name: 'Nomor Rumah Akrilik (Black Silver)',
    desc: 'Nomor Rumah Akrilik Double Layer Premium Cutting & Nomor Rumah Minimalis Elegan Tahan Cuaca Custom.',
    price: 'Rp 150.000',
    imgSrc: '/images/produk_grid_norumah1.png'
  },
  {
    id: '2',
    name: 'Nomor Rumah Akrilik (White Black)',
    desc: 'Nomor Rumah Akrilik Double Layer Premium Cutting & Nomor Rumah Minimalis Elegan Tahan Cuaca Custom.',
    price: 'Rp 129.000',
    imgSrc: '/images/produk_grid_norumah2.png'
  },
  {
    id: '3',
    name: 'Nomor Rumah Akrilix LED Solar Panel',
    desc: 'Nomor Rumah Solar Panel LED | Lampu Alamat Rumah Otomatis Tanpa Kabel & Custom Nama & Nomor.',
    price: 'Rp 169.000',
    imgSrc: '/images/nomor_led_l.png'
  },
  {
    id: '4',
    name: 'Nomor Rumah Solar Panel LED Putih Boxl',
    desc: 'Nomor Rumah Solar Panel LED Putih Box | Lampu Alamat Rumah Otomatis Tanpa Kabel | Custom Nama & Nomor.',
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-headline text-4xl text-on-surface mb-4">Pilih Karakter Rumahmu</h2>
            <p className="text-on-surface-variant max-w-lg">Koleksi desain kurasi kami yang dirancang untuk menyatu sempurna dengan berbagai gaya arsitektur.</p>
          </div>
          <Link href="/checkout" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
            Lihat Semua Koleksi <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
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
