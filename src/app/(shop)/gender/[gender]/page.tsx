// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { notFound, redirect } from 'next/navigation';
import { Pagination, ProductGrid } from '@/components';
import { Title } from '@/components/ui/Title';
import { getPaginationProductWithImages } from '@/actions';
import { Gender } from '@prisma/client';

export interface PageProps {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}
export default async function ({ params, searchParams }: PageProps) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = 10;
  // if theres a server side error or exeption , we can create a error.tsx component with 'use client side it need to be a client side component' like the one i have on the path gender/gender/error.tsx to be able to show my personalized error page message and it does not need to be imported into this component
  const { products, totalPages, productsCount } =
    await getPaginationProductWithImages({
      page,
      take,
      gender: gender as Gender,
    });

  if (!products?.length) redirect(`/gender/${gender}`);

  //we dont need this unless its a client side error
  // if (!['kid', 'men', 'women'].includes(gender)) {
  //   return notFound();
  // }

  return (
    <>
      <Title
        title='Store'
        subTitle={`${gender === 'kid' ? gender + 's' : gender} products`}
        customClasses='px-3 items-center'
      />
      <ProductGrid products={products} />
      <Pagination
        totalPages={totalPages}
        take={take}
        productsCount={productsCount}
      />
    </>
  );
}
