'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart: CartProduct[] = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  // if (!productsInCart.length) {
  //   redirect('/empty');
  // }

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
          <Link
            className='hover:text-blue-600 duration-300 hover:underline hover:underline-offset-4'
            href={`/product/${product.slug}`}
          >
            Size {product.size} - {product.title}
          </Link>
          <p>${product.price}</p>
          <QuantitySelector
            quantity={product.quantity}
            onQuantityChanged={(quantity) =>
              updateProductQuantity(product, quantity)
            }
            inStock={product.inStock}
          />
          <button className='underline underline-offset-4'>Remove</button>
        </div>
      </div>
    ))
  );
};
