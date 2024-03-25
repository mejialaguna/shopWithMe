'use client';

import React, { useCallback, useState } from 'react';
import { QuantitySelector, SizeSelector } from '..';
import { CartProduct, Product, Size } from '@/interfaces';
import { AnimatedTooltip } from '../ui/AnimatedToolTip';
import { useCartStore } from '@/store/cart/cart-store';

interface AddCartProp {
  product: Product;
}

export const AddToCart = ({ product }: AddCartProp) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const disabled = product.inStock === 0;
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
    getTotalItems()
  }, [size, product.id, product.slug, product.title, product.price,
    product.images, product.inStock, quantity, addProductToCart, getTotalItems]);

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
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        inStock={product?.inStock}
      />
      <button
        disabled={disabled}
        className={` my-5 ${!disabled ? 'btn-primary' : ' btn-secondary cursor-not-allowed'}`}
        onClick={addToCart}
      >
        {disabled ? 'Out of Stock' : 'add to cart'}
      </button>
    </>
  );
};
