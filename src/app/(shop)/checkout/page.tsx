import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components/ui/Title';
import { initialData } from '@/seed/seed';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
            <div>
              <p className='mb-5'>
                <span className='text-xs'>
                  By clicking on Order, you accept our
                  <a href='#' className='underline text-blue-700 mx-1'>
                    terms and conditions
                  </a>
                  and use
                  <a href='#' className='underline text-blue-700 mx-1'>
                    policy
                  </a>
                </span>
              </p>
              <Link
                href='/orders/124525'
                className='flex justify-center mt-5 mb-2 btn-primary w-full'
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
