'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomizerSection from './sections/CustomizerSection';
import CheckoutSection from './sections/CheckoutSection';
import { CartItem } from './types';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');`}</style>

      <Header />
      <main className="pt-20">
        <CustomizerSection onAddToCart={handleAddToCart} />
        <CheckoutSection 
          cart={cart}
          cartTotal={cartTotal}
          updateQty={updateQty}
          removeItem={removeItem}
        />
      </main>
      <Footer />
    </>
  );
}