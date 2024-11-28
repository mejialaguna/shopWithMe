'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const [isShoppingcartEmpty, setIsShoppingcartEmpty] = useState(false);
  const productsInCart: CartProduct[] = useCartStore((state) => state.cart);
  const {updateProductQuantity, removeProduct} = useCartStore(
    (state) => state
  );

  useEffect(() => {
    const shoppingCartString =
      window.localStorage.getItem('shoppingCart') || null;
    setIsShoppingcartEmpty(
      !(
        shoppingCartString &&
        JSON.parse(shoppingCartString)?.state?.cart?.length
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
        <ProductImage
          src={product.images}
          alt={product.title}
          width={100}
          height={100}
          additionalProps={{
            sizes: '100px'
          }}
          className='rounded mr-5'
        />
        <div>
          <Link
            className='hover:text-blue-600 duration-300 hover:underline hover:underline-offset-4'
            href={`/product/${product.slug}`}
          >
            Size {product.size} - {product.title}
          </Link>
          <p>{currencyFormatter(product.price)}</p>
          <QuantitySelector
            quantity={product.quantity}
            onQuantityChanged={(quantity) =>
              updateProductQuantity(product, quantity)
            }
            inStock={product.inStock}
          />
          <button
            onClick={() => removeProduct(product)}
            className='underline underline-offset-4'
          >
            Remove
          </button>
        </div>
      </div>
    ))
  );
};
