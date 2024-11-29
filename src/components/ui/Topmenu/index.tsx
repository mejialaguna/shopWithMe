import React from 'react';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import { titleFonts } from '@/config/font';
import { CartMenuButtom } from '@/components';

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
          href='/gender/men'
        >
          Mens
        </Link>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/women'
        >
          womens
        </Link>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/gender/kid'
        >
          Kids
        </Link>
      </div>
      <div className='flex items-center transition-all'>
        <Link href='/' className=' p-2 rounded-md hover:bg-gray-100'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <CartMenuButtom />
      </div>
    </nav>
  );
};
