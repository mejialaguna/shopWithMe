'use client';

import React, { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';

import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
} from 'swiper/modules';

import { ProductImage } from '../product-image/ProductImage';

interface ProductSlideShowProp {
  images: string[];
  title: string;
  customClasses?: string;
}

export const ProductSlideShow = ({
  images,
  customClasses,
}: ProductSlideShowProp) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={`${customClasses}`}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images?.map((img: string) => (
          <SwiperSlide key={img}>
            <ProductImage
              src={`${img}`}
              alt={img}
              width={400}
              height={400}
              additionalProps={{
                sizes:
                  '(min-width: 1040px) calc(40vw - 34px), (min-width: 800px) calc(65.91vw - 56px), (min-width: 640px) 85vw, 99.06vw',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images?.map((img: string) => (
          <SwiperSlide key={img} className='rounded-xl'>
            <ProductImage
              className='rounded-xl'
              src={`${img}`}
              alt={img}
              width={200}
              height={200}
              additionalProps={{
                priority: true,
                // eslint-disable-next-line max-len
                sizes: '(min-width: 1040px) calc(40vw - 34px), (min-width: 800px) calc(65.91vw - 56px), (min-width: 640px) 85vw, (min-width: 400px) 99.09vw, calc(73.75vw + 76px)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
