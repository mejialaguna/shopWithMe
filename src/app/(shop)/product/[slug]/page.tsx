import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from '@/components';
import { titleFonts } from '@/config/font';
import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

export interface PageProps {
  params: {
    slug: string;
  };
}

export default function ({ params }: PageProps) {
  const { slug } = params;

  const product = initialData.products.find(
    (product: Product) => product.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <div className='mt-5 mb-20 flex flex-col md:grid md:grid-cols-3 gap-3'>
      <div className='col-span-1 md:col-span-2'>
        <ProductSlideShow
          images={product.images}
          title={product.title}
          customClasses='hidden sm:block'
        />
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          customClasses='max-[639px]:block hidden'
        />
      </div>

      <div className='col-span-1 px-5'>
        <h1 className={`antialiased font-bold text-xl ${titleFonts.className}`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        <SizeSelector availableSizes={product.sizes} selectedSize={'M'} />
        <QuantitySelector quantity={2} />
        <button className='btn-primary my-5'> add to cart</button>
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
