'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const products = [
  {
    id: 'rustic-oak',
    name: 'Rustic Oak',
    desc: 'Sentuhan kayu hangat untuk hunian asri.',
    price: 'Rp 149.000',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmF7G7d6ckmPTmCKizmFtNi3H3ANU0m3mJSnSZkoruqWDOP0EqL2CRcTj3-ZzHmJpdSsRhRFT8ZMFvipi0qOqCCnrEWLHIy1EXIhgvSwnLkpJ_HOYorfvg70OcsdM9XEPjSvVnJIsv3xenHti0OgiahigZ-GcWjRn2U1qRinXWTAPVN8wnDnXC35rRFGYuCPw17d-H3UmfXMTqAuoo382hBpuFEpHBUMTumZMQnRau3I6e02tjh3vhqP-e_qOT3OtYORzAfj69Pjo'
  },
  {
    id: 'modern-matte',
    name: 'Modern Matte',
    desc: 'Elegan dalam kesederhanaan monokrom.',
    price: 'Rp 129.000',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWYlZxL6gsvqcrGBjIDjUbGbJiwjekKUP2DEMyRyiYchdkFhqB2zW5ex3i1HRM8E5lV498lqAI0FLKz0yhjWOTqcpkpELEuirg1dB4FIYCNOVYx8470cFSGFBE-OpU8O2bgVEDsDzAIB3X9snOzSQPWFdGs7oMbsQxlER3vXRkzr_Li3i1kymG7lnkjL59GFn0YcRDyUAtBpaLOZQ96VeFTAcyX3CVxJvCVQcQSOn_bBEAin6f6V_OHPUM0jutjfQQ18flh7bmhOc'
  },
  {
    id: 'golden-classic',
    name: 'Golden Classic',
    desc: 'Pancaran kemewahan di setiap ambang pintu.',
    price: 'Rp 169.000',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQwy5-iXDcjFHWZPPize429lILBp4GEPfleHFJPgyQgFMXK7TKkCKo_z84GIjbqwsv2fAsc_eXR5jV3eDSyL4q-3l3eWtit77ecdPbRcbkTkgJgVv2p8WqYrj5Ie_RCzYWXmu7gUx4AZSWq6ulUqRwkWVwqZBmMWr1qCA3CTb3XUWALI-zRUamnst0sR4ppVKeV0SGcCc5Vc8YsbijxkWSQHLNY4jZ_9F_cOdhaMwlgoOxfEes81arNgZlAKg1csix6HEVv6nz-IA'
  },
  {
    id: 'sage-garden',
    name: 'Sage Garden',
    desc: 'Ketenangan alami untuk teras impian.',
    price: 'Rp 139.000',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1UNvhPdcDhsKMoaSLvuvlp0YtWSPr4QDRYlgTohPf4E4kyUvtuExAb4yitK6I5iGsls3JcKHVr0x07Czxqu8QaIabNPFOMpjW-XT5pJC26QN99xaJ2woc6EUDfgUrO_Kt40CEA83ZNHmaL1bUTsD3zX0DCZKz2Q2TXI5aSIs0gU-pAbJz27nBWnZ8H7clz2uf8gza5pmbWJQ3faHZhMVN7_r2PzRMuyoGZK_lA2fVP_DFjAVzLr573N9iKYp1bZZFUIDQIUrJSnk'
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
    // Ambil keranjang lama dari browser
    const existingCart = JSON.parse(localStorage.getItem('acrylic_cart') || '[]');

    // Ubah format harga ("Rp 150.000" jadi angka 150000)
    const rawPrice = parseInt(price.replace(/[^0-9]/g, ''));

    // Cek apakah barang sudah ada di keranjang
    const existingItemIndex = existingCart.findIndex((item: any) => item.title === title);

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1; // Jika ada, tambah jumlahnya
    } else {
      existingCart.push({ id, title, price: rawPrice, quantity: 1, imageSrc }); // Jika baru, masukkan
    }

    // Simpan keranjang baru dan pindah ke checkout
    localStorage.setItem('acrylic_cart', JSON.stringify(existingCart));
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
          <Link href="/katalog" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
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
