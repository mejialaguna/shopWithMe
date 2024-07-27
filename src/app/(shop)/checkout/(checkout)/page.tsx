import Link from 'next/link';
import { Title } from '@/components/ui/Title';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';


export default function () {
  return (
    <div className='flex justify-center items-center px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px] mb-8 sm:mb-0'>
        <Title title='Verify Order' customClasses='' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Adjust items</span>
            <Link
              href='/cart'
              className='mb-5 hover:text-blue-700 transition-all duration-500 underline underline-offset-4'
            >
              Continue shopping
            </Link>

            <ProductsInCart />
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
