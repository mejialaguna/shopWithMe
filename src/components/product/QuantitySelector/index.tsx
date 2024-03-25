'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Prop {
  quantity: number;
  onQuantityChanged: (value: number) => void;
  inStock:number;
}

export const QuantitySelector = ({ quantity, onQuantityChanged, inStock }: Prop) => {
  const onValueChanged = (value: number) => {
    onQuantityChanged(Math.max(Math.min(quantity + value, inStock), 1));
  };

  return (
    <div className='flex'>
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className='w-20 mx-3 px-3 bg-gray-200 text-center rounded-md'>
        {quantity}
      </span>
      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  );
};
