'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { titleFonts } from '@/config/font';
import { getProductBySlug } from '@/actions/product/get-product-by-slug';

interface StockLabelProp {
  slug: string;
}
export const StockLabel = ({ slug }: StockLabelProp) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const product = await getProductBySlug(slug);
    setStock(product?.inStock ?? 0);
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <h1 className='w-16 h-3 bg-white rounded dark:bg-gray-300 animate-pulse'/>
      ) : (
        <h1 className={`antialiased font-bold text-xs ${titleFonts.className}`}>
          In Stock: {stock}
        </h1>
      )}
    </>
  );
};
