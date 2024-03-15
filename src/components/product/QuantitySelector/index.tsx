'use client'

import React, { useCallback, useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Prop {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Prop) => {
  const [count, setCount] = useState<number>(quantity);

  const onQuantityChanged = useCallback((value: number) => {
    setCount((prev) => Math.min(Math.max(prev + value, 1), 5));
  }, []);

  return (
    <div className='flex'>
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className='w-20 mx-3 px-3 bg-gray-200 text-center rounded-md'>
        {count.toString()}
      </span>
      <button onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  );
};
