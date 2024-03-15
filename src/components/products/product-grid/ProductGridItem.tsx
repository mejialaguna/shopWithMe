'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

interface ProductProps {
  products: Product;
  idx:number;
}

export const ProductGridItem = ({ products, idx }: ProductProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(products.images[0])

  const setHoverIndex = useCallback((value: number | null) => {
      setHoveredIndex(value);
    }, [], )

  return (
    <div
      className='relative group block p-2 fade-in'
      onMouseEnter={() => setHoverIndex(idx)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className='absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl'
            layoutId='hoverBackground'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <div
        className={cn(
          `rounded-2xl overflow-hidden bg-black border opacity-80
          border-transparent dark:border-white/[0.2] transition-all
          duration-1000 group-hover:border-slate-700 group-hover:opacity-100 relative z-20`
        )}
      >
        <div className='relative z-50'>
          <div className='p-4 flex flex-col'>
            <Image
              className='self-center rounded-md transition-all duration-1000 bg-white'
              width={400}
              height={400}
              src={`/products/${showImage}`}
              alt='product image'
              priority
              onMouseEnter={() => setShowImage(products.images[1])}
              onMouseLeave={() => setShowImage(products.images[0])}
            />
            <Link
              className={cn(
                'text-zinc-100 mt-4 hover:text-blue-600 duration-300'
              )}
              href={`product/${products.slug}`}
            >
              {products.title}
            </Link>
            <span
              className={cn(
                'font-bold text-zinc-100 tracking-wide leading-relaxed text-sm'
              )}
            >
              $ {products.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
