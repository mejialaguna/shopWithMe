'use client';

import React, { useCallback, useState } from 'react';
import { QuantitySelector, SizeSelector } from '..';
import { Product, Size } from '@/interfaces';
import { AnimatedTooltip } from '../ui/AnimatedToolTip';

interface AddCartProp {
  product: Product;
}

export const AddToCart = ({ product }: AddCartProp) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const disabled = product.inStock === 0;

  const addToCart = useCallback(() => {
    if (size === undefined) {
      setShowToolTip(true);
      return
    }
  }, [size]);

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
        onAddItem={setQuantity}
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
