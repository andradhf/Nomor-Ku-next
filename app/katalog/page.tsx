'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const catalogData = [
  { id: 1, title: "Prism House Numbers", description: "8mm laser-cut architectural grade acrylic with hidden standoffs.", price: "Rp 150.000", category: "Architecture", imageSrc: "https://images.unsplash.com/photo-1610440042-bb443a5394b9?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Summit Pillar Award", description: "Hand-polished monolithic trophy with high-clarity refractor edges.", price: "Rp 450.000", category: "Awards", imageSrc: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Ethereal Table Sets", description: "Floral acrylic collection with bespoke gold-leaf hand calligraphy.", price: "Rp 250.000", category: "Wedding", imageSrc: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Studio Glass Signage", description: "Corporate door signage panel with premium brushed steel hardware.", price: "Rp 350.000", category: "Architecture", imageSrc: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Geometric Toppers", description: "Precision mirrored acrylic toppers for celebratory centerpieces.", price: "Rp 85.000", category: "Wedding", imageSrc: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Floating Frames", description: "Double-panel UV-resistant acrylic with magnetic edge closure.", price: "Rp 210.000", category: "Bespoke", imageSrc: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" },
  { id: 7, title: "Curated Plinths", description: "Structural 10mm load-bearing acrylic for high-end gallery display.", price: "Rp 850.000", category: "Bespoke", imageSrc: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop" },
  { id: 8, title: "Brand Identity Kit", description: "Multi-layered colored acrylic logos with integrated LED backlight options.", price: "Rp 550.000", category: "Awards", imageSrc: "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=800&auto=format&fit=crop" }
];

const categories = ["All Collections", "Architecture", "Awards", "Wedding", "Bespoke"];

export default function CatalogPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All Collections");

  const filteredProducts = activeFilter === "All Collections" 
    ? catalogData 
    : catalogData.filter(item => item.category === activeFilter);

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('acrylic_cart') || '[]');
    const rawPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    const existingItemIndex = existingCart.findIndex((item: any) => item.title === product.title);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id.toString(),
        title: product.title,
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Kembali
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mr-4">Filter By :</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${activeFilter === category ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-variant text-on-surface-variant hover:bg-outline-variant/30'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-surface-variant">
                  <img src={product.imageSrc} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-headline font-bold text-lg text-on-background mb-1">{product.title}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
                  <span className="font-bold text-primary">{product.price}</span>
                  <button onClick={() => handleAddToCart(product)} className="px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors">
                    Add to Cart & Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}