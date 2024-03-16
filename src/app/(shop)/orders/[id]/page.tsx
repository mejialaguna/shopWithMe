'use client';

import Image from 'next/image';
import { Title } from '@/components/ui/Title';
import { initialData } from '@/seed/seed';
import { IoCardOutline } from 'react-icons/io5';
import { useState } from 'react';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface OrdersProp {
  params: {
    id: string;
  };
}

export default function ({ params }: OrdersProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPaid, setIsPaid] = useState(true);
  const { id } = params;

  return (
    <div className='flex justify-center items-center px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px] mb-8 sm:mb-0'>
        <Title title={`Order #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <div
              className={`flex items-center rounded-lg py-2 px-3.5 text-xs
              font-bold text-white mb-5 ${!isPaid ? 'bg-red-400' : 'bg-green-700'}`}
            >
              <IoCardOutline size={20} />
              <span className='mx-2'>{!isPaid ? 'Pending' : 'Paid'}</span>
            </div>

            {productsInCart.map((product) => (
              <div key={product.slug} className='flex !mb-3.5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  sizes='100px'
                  className='rounded mr-5'
                />
                <div>
                  <p>{product.title}</p>
                  <div className='flex flex-row justify-between w-60'>
                    <p>x3</p>
                    <p>${product.price} </p>
                  </div>
                  <div className='flex flex-row justify-between w-60'>
                    <p className='font-bold'>SubTotal </p>
                    <p className='font-bold'>${product.price * 3}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-white rounded-xl shadow-xl p-7 h-max'>
            <h2 className='text-2xl mb-2'>Shipment Address</h2>
            <div>
              <p>JLML</p>
              <p>bello horizonte</p>
              <p>rotonda</p>
              <p>para el lago</p>
              <p>para arriba</p>
              <p>07660</p>
              <p>18002262727</p>
            </div>

            <hr className='w-full h-px bg-gray-200 mt-5 mb-10' />

            <h2 className='text-2xl mb-2'>Order View</h2>
            <div className='grid grid-cols-2'>
              <span className=''>No. Products</span>
              <span className='text-right'> 3 Items</span>

              <span className=''>Subtotal</span>
              <span className='text-right'>$100</span>

              <span className=''>Tax.</span>
              <span className='text-right'> 7.25%</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='text-right mt-5 text-2xl'>$100</span>
            </div>
            <div
              className={`flex items-center rounded-lg py-2 px-3.5 text-xs
              font-bold text-white mt-5 ${!isPaid ? 'bg-red-400' : 'bg-green-700'}`}
            >
              <IoCardOutline size={20} />
              <span className='mx-2'>{!isPaid ? 'Pending' : 'Paid'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
