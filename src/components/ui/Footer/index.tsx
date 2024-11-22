import React from 'react';
import Link from 'next/link';
import { titleFonts } from '@/config/font';

export const Footer = () => {
  return (
    <div className='flex w-full z-10 justify-center text-xs mb-10 bg-gray-800 text-white py-2 fixed bottom-[-40px]'>
      <Link
        href='/'
        className={`antialiased font-bold ${titleFonts.className}`}
      >
        <span>Clone</span>
        <span> | Shop | </span>
        <span>
          {'\u00A9'} {new Date().getFullYear()}
        </span>
      </Link>
    </div>
  );
};
