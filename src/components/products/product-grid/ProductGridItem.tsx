'use client';

import { Product } from '@/interfaces';
import { cn } from '@/utils/cn';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/Card';

interface ProductProps {
  products: Product[];
}

export const ProductGridItem = ({ products }: ProductProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 py-10')}
    >
      {products.map((item, idx) => (
        <div
          key={item?.slug}
          className='relative group block p-2 h-full w-full'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card
            title={item.title}
            description={item.description}
            hoveredIndex={hoveredIndex}
            idx={idx}
          >
            <Image
              className='self-center'
              width={500}
              height={500}
              src={`/products/${item.images[0]}`}
              alt='product image'
            />
          </Card>
        </div>
      ))}
    </div>
  );
};
