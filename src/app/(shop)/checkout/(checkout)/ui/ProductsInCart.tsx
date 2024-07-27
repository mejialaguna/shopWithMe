'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormatter } from '@/utils/currencyFormatter';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const [isShoppingcartEmpty, setIsShoppingcartEmpty] = useState(false);
  const productsInCart: CartProduct[] = useCartStore((state) => state.cart);

  // ** adding the use state and the window object to avoid decripensi issues between the client and the server
  useEffect(() => {
    const shoppingCartString =
      window.localStorage.getItem('shoppingCart') || null;
    setIsShoppingcartEmpty(
      !(
        shoppingCartString && JSON.parse(shoppingCartString)?.state?.cart?.length
      )
    );
    setLoaded(true);
  }, []);

  if (!productsInCart.length && isShoppingcartEmpty) {
    redirect('/empty');
  }

  return (
    loaded &&
    productsInCart?.map((product) => (
      <div key={`${product.slug}-${product.size}`} className='flex !mb-3.5'>
        <Image
          src={`/products/${product.images}`}
          alt={product.title}
          width={100}
          height={100}
          sizes='100px'
          className='rounded mr-5'
        />
        <div>
          <span>
            Size {product.size} - {product.title} ({product.quantity})
          </span>
          <p className='font-bold'>{currencyFormatter(product.price)}</p>
          <p className='font-bold'>
            Subtotal: {currencyFormatter(product.price * product.quantity)}
          </p>
        </div>
      </div>
    ))
  );
};
