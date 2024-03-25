import Link from 'next/link';
import { Title } from '@/components/ui/Title';
import { ProductsInCart } from './ui/ProductsInCart';
import { ProdustSummary } from './ui/ProdustSummary';

export default function () {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px] mb-8 sm:mb-0'>
        <Title title='Cart' customClasses='' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'> Add more items</span>
            <Link
              href='/'
              className='mb-5 hover:text-blue-700 transition-all duration-500 underline underline-offset-4'
            >
              Continue shopping
            </Link>

            <ProductsInCart />
          </div>
          <div className='bg-white rounded-xl shadow-xl p-7 h-max'>
            <ProdustSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
