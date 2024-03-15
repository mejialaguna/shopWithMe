'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ProductMobileSlideShow } from '../ProductMobileSlideShow';
import { ProductSlideShow } from '../ProductSlideShow';

interface SlideShowWrapperProp {
  images: string[];
  title: string;
  customClasses?: string;
}

export const SlideShowWrapper = ({ images, title }: SlideShowWrapperProp) => {
  const isMobile = useMemo(() => typeof window === 'undefined' || window.innerWidth < 431,
    []
  );

  const [windowSize, setWindowSize] = useState({
    width: isMobile ? 0 : window.innerWidth,
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

  return isMobile ? (
    <ProductMobileSlideShow images={images} title={title} />
  ) : (
    <ProductSlideShow images={images} title={title} />
  );
};
