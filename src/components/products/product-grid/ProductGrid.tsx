import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';
import { cn } from '@/utils/cn';
interface ProductProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductProps) => {
  return (
    <div className={'flex flex-row flex-wrap justify-center pb-10'}>
      {products.map((item, idx) => {
        return <ProductGridItem key={item.slug} products={item} idx={idx} />;
      })}
    </div>
  );
};
