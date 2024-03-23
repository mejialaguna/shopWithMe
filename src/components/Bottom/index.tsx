'use client';

import React, { useEffect, useState } from 'react';
import { useUiStore } from '@/store/ui/ui-store';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { useCartStore } from '@/store/cart/cart-store';

export const Buttom = () => {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const { openSideMenu } = useUiStore((state) => ({
    openSideMenu: state.openSideMenu,
  }));
  // this is help to avoid the hidration error between the server and the client
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  

  return (
    <>
      <Link href='/cart' className='p-2 rounded-md hover:bg-gray-100'>
        <div className='relative'>
          <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
            {loaded && totalItemsInCart > 0 && totalItemsInCart}
          </span>
          <IoCartOutline className='W-5 h-5' />
        </div>
      </Link>

      <button
        className='p-2 rounded-md transition-all hover:bg-gray-100'
        onClick={openSideMenu}
      >
        menu
      </button>
    </>
  );
};
