'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import '../ProductSlideShow/slideshow.css';
import {
  Autoplay,
  FreeMode,
  Thumbs,
  Pagination,
} from 'swiper/modules';


interface ProductMobileSlideShowProp {
  images: string[];
  title: string;
  customClasses?: string;
}

export const ProductMobileSlideShow = ({
  images,
  customClasses,
}: ProductMobileSlideShowProp) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={customClasses}>
      <Swiper
        style={
          {
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Thumbs, Pagination]}
        className='mySwiper2'
      >
        {images.map((img: string) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              alt={img}
              width={400}
              height={400}
              sizes='(min-width: 1040px) calc(40vw - 34px), (min-width: 800px) calc(65.91vw - 56px), (min-width: 640px) 85vw, 99.06vw'
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
        modules={[FreeMode, Thumbs]}
        className='mySwiper'
      >
        {images.map((img: string) => (
          <SwiperSlide key={img} className='rounded-xl'>
            <Image
              className='rounded-xl'
              src={`/products/${img}`}
              alt={img}
              width={200}
              height={200}
              sizes='(min-width: 1040px) calc(40vw - 34px), (min-width: 800px)
              calc(65.91vw - 56px), (min-width: 640px) 85vw, (min-width: 400px) 99.09vw, calc(73.75vw + 76px)'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
