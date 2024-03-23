'use client';

import React, { useCallback } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Prop {
  quantity: number;
  onAddItem: React.Dispatch<React.SetStateAction<number>>;
  inStock: number;
}

export const QuantitySelector = ({ quantity, onAddItem, inStock }: Prop) => {
  const onQuantityChanged = useCallback(
    (value: number) => {
      // calculatin the quantity they are able to but between 1 and the total quantity in stock,(instead of passing a hard value like 5 to keep between 1 and 5)
      onAddItem((prev) => Math.min(Math.max(prev + value, 1), inStock));
    },
    [onAddItem, inStock]
  );

  return (
    <div className='flex'>
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className='w-20 mx-3 px-3 bg-gray-200 text-center rounded-md'>
        {!inStock ? inStock : quantity.toString()}
      </span>
      <button onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  );
};
