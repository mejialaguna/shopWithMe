'use client';

import { useCartStore } from '@/store/cart/cart-store';
import Link from 'next/link';
import React from 'react';

export const ProdustSummary = () => {
  const { getSummaryInformation, getTotalItems } = useCartStore(
    (state) => state);
  const { subtotal, total } = getSummaryInformation();
  const totalItems = getTotalItems();
  return (
    <>
      <h2 className='text-2xl mb-2'>Order View</h2>
      <div className='grid grid-cols-2'>
        <span className=''>No. Products</span>
        <span className='text-right'>{totalItems} Items</span>

        <span className=''>Subtotal</span>
        <span className='text-right'>${subtotal}</span>

        <span className=''>Tax.</span>
        <span className='text-right'> 7.25%</span>

        <span className='mt-5 text-2xl'>Total</span>
        <span className='text-right mt-5 text-2xl'>${total}</span>
      </div>
      <div className=''>
        <Link
          href='/checkout/address'
          className='flex justify-center mt-5 mb-2 btn-primary w-full'
        >
          Checkout
        </Link>
      </div>
    </>
  );
};
