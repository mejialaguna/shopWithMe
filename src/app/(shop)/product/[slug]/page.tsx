export const revalidate = 604800; // revalidate every 7days

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import {
  AddToCart,
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from '@/components';
import { titleFonts } from '@/config/font';
import { getProductBySlug } from '@/actions/product/get-product-by-slug';

export interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  const product = await await getProductBySlug(slug);
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/product/${product?.images[1]}`],
    },
  };
}

export default async function ({ params }: PageProps) {
  const { slug } = params;

  const product = await getProductBySlug(slug);
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
        <StockLabel slug={slug} />
        <h1 className={`antialiased font-bold text-xl ${titleFonts.className}`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>
        <AddToCart product={product} />
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
