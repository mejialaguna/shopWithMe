import { create } from 'zustand';
import { CartProduct } from '@/interfaces';
import { persist } from 'zustand/middleware';
import { currencyFormatter } from '@/utils/currencyFormatter';

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subtotal: string;
    total: string;
    tax: string;
  };
}

export const useCartStore = create<State>()(
  persist(
    // get method allowed me to get the current state from store
    (set, get) => ({
      // starting the state
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
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            const newQuantity = Math.max(
              Math.min(quantity, product.inStock),
              1
            );
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        set({ cart: updatedCartProduct });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter((item) => {
          return !(item.id === product.id && item.size === product.size);
        });
        set({ cart: updatedCartProducts });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce((accumulator, items) => {
          return items.price * items.quantity + accumulator;
        }, 0);
        const tax = subtotal * 0.0725;
        const total = (tax + subtotal);
        return {
          subtotal: currencyFormatter(subtotal),
          total: currencyFormatter(total),
          tax: currencyFormatter(tax),
        };
      },
    }),
    {
      name: 'shoppingCart',
    }
  )
);
