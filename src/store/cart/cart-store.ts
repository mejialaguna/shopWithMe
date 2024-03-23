import { create } from 'zustand';
import { CartProduct } from '@/interfaces';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
}

export const useCartStore = create<State>()(
  persist(
    // get method allowed me to get the current state from store
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const productIncart = cart.some(
          (cartItem) =>
            cartItem.id === product.id && cartItem.size === product.size
        );

        if (!productIncart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0
        );
      },
    }),
    {
      name: 'shoppingCart',
    }
  )
);
