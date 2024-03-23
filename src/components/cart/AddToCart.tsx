'use client';

import React, { useState } from 'react';
import { QuantitySelector, SizeSelector } from '..';
import { Product, Size } from '@/interfaces';

interface AddCartProp {
  product: Product;
}

export const AddToCart = ({ product }: AddCartProp) => {
  const [size, setSize] = useState<Size>('XS');
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      <SizeSelector
        availableSizes={product?.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
        inStock={product?.inStock}
      />
      <QuantitySelector
        quantity={quantity}
        onAddItem={setQuantity}
        inStock={product?.inStock}
      />
    </>
  );
};
