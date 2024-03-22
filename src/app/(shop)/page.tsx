import { getPaginationProductWithImages } from '@/actions';
import { Pagination } from '@/components';
import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Title } from '@/components/ui/Title';
import { redirect } from 'next/navigation';
interface HomeProps {
  searchParams: {
    page?: string;
  };
}
// lets destructure searchParams or params from the props.
export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = 10;
  const { products, totalPages, productsCount } =
    await getPaginationProductWithImages({
      page,
      take,
    });

  if (!products?.length) redirect('/');
  return (
    <div className='mx-2 sm:mx-0'>
      <Title
        title='Store'
        subTitle='All products'
        customClasses='mx-3 sm:ml-0'
      />
      <ProductGrid products={products} />
      <Pagination
        totalPages={totalPages}
        take={take}
        productsCount={productsCount}
      />
    </div>
  );
}

// wrappin the route name with parentheses will help avoid having to create an slash something like instead of doing something like this http://localhost:3000/shop we can do it like this http://localhost:3000 , or if we wanto avoid doing something like this http://localhost:3000/auth/login we can do it like this http://localhost:3000/login (wrapping the route name "auth" with parentheses)
