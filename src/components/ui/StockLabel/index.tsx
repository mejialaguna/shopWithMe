'use client';

import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import { titleFonts } from '@/config/font';
import React, { useCallback, useEffect, useState } from 'react';

interface StockLabelProp {
  slug: string;
}
export const StockLabel = ({ slug }: StockLabelProp) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const { inStock } = await getProductBySlug(slug);
    setStock(inStock);
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
