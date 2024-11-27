import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { Title } from '@/components/ui/Title';
import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import { getCategories } from '@/actions/category/get-categories';

interface Props {
  params: {
    slug: string;
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [ product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);

  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'New Product' : 'Edit product'

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}