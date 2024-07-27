import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';
interface ProductProps {
  products: Product[] | undefined;
}

export const ProductGrid = ({ products }: ProductProps) => {
  return (
    <div
      className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}
    >
      {products?.map((item, idx) => {
        return <ProductGridItem key={item.slug} products={item} idx={idx} />;
      })}
    </div>
  );
};
