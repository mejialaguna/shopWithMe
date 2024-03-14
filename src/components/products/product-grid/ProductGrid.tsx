import { Product } from "@/interfaces";
import { ProductGridItem } from './ProductGridItem';

interface ProductProps {
  products: Product[];
}

export const ProductGrid =  ({products} : ProductProps) => {
  return (
    <div className='mx-auto px-8'>
      <ProductGridItem products={products} />
    </div>
  );
}