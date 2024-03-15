import React from 'react';
import { Size } from '@/interfaces';

interface SizeProp {
  selectedSize: Size;
  availableSizes: Size[];
}
export const SizeSelector = ({
  selectedSize = 'XS',
  availableSizes,
}: SizeProp) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold'>Sizes</h3>
      {availableSizes.map((size) => (
        <button
          key={size}
          className={`mx-1 hover:border-b border-black border-solid text-lg ${size === selectedSize ? 'border-b' : ''}`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
