import { ProductGrid } from '@/components/products/product-grid/ProductGrid';
import { Title } from '@/components/ui/Title';
import { initialData } from '@/seed/seed';

export default function Home() {
  const products = initialData.products;
  return (
    <div className='mx-2 sm:mx-0'>
      <Title title='store' subTitle='All products' customClasses='ml-2 sm:ml-0'/>
      <ProductGrid products={products} />
    </div>
  );
}

// wrappin the route name with parentheses will help avoid having to create an slash something like instead of doing something like this http://localhost:3000/shop we can do it like this http://localhost:3000 , or if we wanto avoid doing something like this http://localhost:3000/auth/login we can do it like this http://localhost:3000/login (wrapping the route name "auth" with parentheses)
