'use client';

import React, { useEffect, useState } from 'react';
import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/cart/cart-store';

export const PlaceOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAddressStore((state) => state);
  const { getSummaryInformation, getTotalItems } = useCartStore(
    (state) => state
  );
  const { subtotal, total, tax } = getSummaryInformation();
  const totalItems = getTotalItems();

  useEffect(() => {
    setIsLoading(true)
  }, [])

  if (!isLoading) {
    return (
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-slate-700 h-10 w-10'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 bg-slate-700 rounded'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='h-2 bg-slate-700 rounded col-span-2'></div>
                <div className='h-2 bg-slate-700 rounded col-span-1'></div>
              </div>
              <div className='h-2 bg-slate-700 rounded'></div>
            </div>
          </div>
        </div>
    );
  }
  
  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-max'>
      <h2 className='text-2xl mb-2'>Delivery Address</h2>
      <div>
        <p>
          {address?.firstName} {address?.lastName}
        </p>
        <p>{address?.address} {address?.zipcode}</p>
        <p>{address?.phone}</p>
      </div>

      <hr className='w-full h-px bg-gray-200 mt-5 mb-10' />

      <h2 className='text-2xl mb-2'>Order View</h2>
      <div className='grid grid-cols-2'>
          <span className=''>No. Products</span>
          <span className='text-right'>
            {totalItems} Item{totalItems > 1 && 's'}
          </span>

          <span className=''>Subtotal</span>
          <span className='text-right'>{subtotal}</span>

          <span className=''>Tax.(7.25%)</span>
          <span className='text-right'> {tax}</span>

          <span className='mt-5 text-2xl'>Total</span>
          <span className='text-right mt-5 text-2xl'>{total}</span>
        </div>
      <div>
        <p className='mb-5'>
          <span className='text-xs'>
            By clicking on Order, you accept our
            <a href='#' className='underline text-blue-700 mx-1'>
              terms and conditions
            </a>
            and use
            <a href='#' className='underline text-blue-700 mx-1'>
              policy
            </a>
          </span>
        </p>
        <button
          // href='/orders/124525'
          className='flex justify-center mt-5 mb-2 btn-primary w-full'
        >
          Order
        </button>
      </div>
    </div>
  );
};

