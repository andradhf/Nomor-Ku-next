import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  item_code: string;
  item_name: string;
  quantity: number;
  image?: string;
  price?: number;
  customization?: Record<string, unknown>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item_code: string) => void;
  updateQuantity: (item_code: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.item_code === item.item_code);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.item_code === item.item_code
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (item_code) =>
        set((state) => ({
          items: state.items.filter((i) => i.item_code !== item_code),
        })),
      updateQuantity: (item_code, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.item_code === item_code ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'nomorku-cart' }
  )
);
