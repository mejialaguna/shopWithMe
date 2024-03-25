import Link from 'next/link';
import { Title } from '@/components/ui/Title';
import { ProductsInCart } from './ui/ProductsInCart';

// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

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
            <div className=''>
              <Link
                href='/checkout/address'
                className='flex justify-center mt-5 mb-2 btn-primary w-full'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
