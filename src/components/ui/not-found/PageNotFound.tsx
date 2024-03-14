import React from 'react';
import { titleFonts } from '@/config/font';
import Image from 'next/image';
import Link from 'next/link';

import notFoundImage from '../../../../public/imgs/13315300_5203299.jpg';
import { useParams } from 'next/navigation';

export const PageNotFound = () => {
  return (
    <div className='flex flex-col h-[800px] w-full justify-center items-center align-middle'>
      <div className='relative w-full max-w-[700px] aspect-[70/45] my-8 mx-auto'>
        {/* the image should be displayed at 100% of the viewport width (100vw). If
        the viewport width is greater than 768 pixels, the image should be
        displayed with a width of 700 pixels (700px). */}
        <Image
          className='rounded'
          src={notFoundImage}
          alt='not found image'
          fill
          priority
          sizes='(max-width:768px) 100vw, 700px'
        />
      </div>
      <div className='text-center px-5 mx-5'>
        <p className='font-semibold text-xl '>We are very sorry.</p>
        <p className='font-light'>
          <span className=''>
            Go back &nbsp;
            <Link href='/' className='text-blue-700 font-medium'>
              Home.
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
