import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components/ui/Title';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function () {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'> Add more items</span>
            <Link
              href='/'
              className='mb-5 hover:text-blue-700 transition-all duration-500 underline underline-offset-4'
            >
              Continue shopping
            </Link>
          </div>
          {productsInCart.map((product) => (
            <div key={product.slug} className='flex'>
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
                <p>${product.price}</p>
                <QuantitySelector quantity={2} />
                <button className='underline underline-offset-4'> Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
