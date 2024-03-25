'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { QuantitySelector, SizeSelector } from '..';
import { CartProduct, Product, Size } from '@/interfaces';
import { AnimatedTooltip } from '../ui/AnimatedToolTip';
import { useCartStore } from '@/store/cart/cart-store';
interface AddCartProp {
  product: Product;
}

export const AddToCart = ({ product }: AddCartProp) => {
  const disabled = useMemo(() => product.inStock === 0, [product.inStock]);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(disabled ? 0 : 1);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const { addProductToCart, getTotalItems } = useCartStore((state) => state);

  const addToCart = useCallback(() => {
    if (size === undefined) {
      setShowToolTip(true);
      return;
    }

    const selectedProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      images: product.images[0],
      inStock: product.inStock,
    };

    addProductToCart(selectedProduct);
    getTotalItems();
  }, [
    size,
    product.id,
    product.slug,
    product.title,
    product.price,
    product.images,
    product.inStock,
    quantity,
    addProductToCart,
    getTotalItems,
  ]);

  return (
    <>
      {showToolTip && <AnimatedTooltip message={'select a size'} />}
      <SizeSelector
        availableSizes={product?.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
        inStock={product?.inStock}
        setShowToolTip={setShowToolTip}
      />
      {!disabled && (
        <QuantitySelector
          quantity={quantity}
          onQuantityChanged={setQuantity}
          inStock={product?.inStock}
        />
      )}

      <button
        disabled={disabled}
        className={`${!disabled ? 'btn-primary my-5 ' : 'mb-5 btn-secondary cursor-not-allowed'}`}
        onClick={addToCart}
      >
        {disabled ? 'Out of Stock' : 'add to cart'}
      </button>
    </>
  );
};
