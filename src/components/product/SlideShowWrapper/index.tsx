'use client';

import React, { useEffect, useState } from 'react';
import { ProductMobileSlideShow } from '../ProductMobileSlideShow';
import { ProductSlideShow } from '../ProductSlideShow';

interface SlideShowWrapperProp {
  images: string[];
  title: string;
  customClasses?: string;
}

export const SlideShowWrapper = ({ images, title }: SlideShowWrapperProp) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowSize.width <= 430 ? (
    <ProductMobileSlideShow images={images} title={title} />
  ) : (
    <ProductSlideShow images={images} title={title} />
  );
};
