import { titleFonts } from '@/config/font';
import Link from 'next/link';
import React from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

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
          href='/category/womens'
        >
          womens
        </Link>
        <Link
          className='p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/kids'
        >
          Kids
        </Link>
      </div>
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
              2
            </span>
            <IoCartOutline className='W-5 h-5' />
          </div>
        </Link>
        <button className='p-2 rounded-md transition-all hover:bg-gray-100'>
          menu
        </button>
      </div>
    </nav>
  );
};
