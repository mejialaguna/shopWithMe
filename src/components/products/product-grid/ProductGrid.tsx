import { Product } from "@/interfaces";
import { ProductGridItem } from './ProductGridItem';
import { cn } from '@/utils/cn';
interface ProductProps {
  products: Product[];
}

export const ProductGrid =  ({products} : ProductProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10')}>
      {products.map((item, idx) => {
        return <ProductGridItem products={item} idx={idx} />;
      })}
      
    </div>
  );
}