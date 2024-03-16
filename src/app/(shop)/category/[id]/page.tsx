import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { ProductGrid } from '@/components';
import { Product } from '@/interfaces';
import { Title } from '@/components/ui/Title';

type validCategories =  'men' | 'women' | 'kid' | 'unisex';
export interface PageProps {
  params: {
    id: validCategories;
  };
}
export default function ({ params }: PageProps) {
  const { id } = params;
  const products = initialData.products.filter(
    (product: Product) => product.gender === id
  );

  if (!['kid', 'men', 'women'].includes(id)) {
    notFound();
  }
  return (
    <>
      <Title
        title='Store'
        subTitle={`${id === 'kid' ? id + 's' : id}  products`}
        customClasses='px-3 items-center'
      />
      <ProductGrid products={products} />
    </>
  );
}
