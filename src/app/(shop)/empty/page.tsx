import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function () {
  return (
    <div className='flex flex-col justify-center items-center h-[800px] transition-all'>
      <IoCartOutline size={200} className='mx-5' />
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-semibold'>
          Your Cart Is Currently Empty!
        </h1>
        <span className='text-xs text-slate-500 mt-5 mb-1'>
          Before proceed to checkout you must add some products to your cart.
        </span>
        <span className='text-xs text-slate-500'>
          You will find a lot of interestig items if you shop with us.
        </span>
        <Link
          href='/'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-7 transition-all duration-500 shadow-xl'
        >
          Let&apos;s Shop
        </Link>
      </div>
    </div>
  );
}
