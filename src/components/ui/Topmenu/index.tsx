import React from 'react';
import Link from 'next/link';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { titleFonts } from '@/config/font';
import { Buttom } from '@/components';

export const TopMenu = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span className={`antialiased font-bold ${titleFonts.className}`}>
            Logo
          </span>
          <span> | Shop </span>
        </Link>
      </div>
      <div className='hidden sm:inline-block'>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/men'
        >
          Mens
        </Link>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/women'
        >
          womens
        </Link>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/kid'
        >
          Kids
        </Link>
      </div>
      <div className='flex items-center transition-all'>
        <Link href='/search' className=' p-2 rounded-md hover:bg-gray-100'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='p-2 rounded-md hover:bg-gray-100'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
              2
            </span>
            <IoCartOutline className='W-5 h-5' />
          </div>
        </Link>
        <Buttom />
      </div>
    </nav>
  );
};
