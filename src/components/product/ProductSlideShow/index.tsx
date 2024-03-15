'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';

interface ProductSlideShowProp {
  images: string[];
  title: string;
  customClasses?: string;
}

export const ProductSlideShow = ({
  images,
  title,
  customClasses,
}: ProductSlideShowProp) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={customClasses}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
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
        {images.map((img: string) => (
          <SwiperSlide key={img}>
            <Image
              src={`/products/${img}`}
              alt={img}
              width={400}
              height={400}
              priority
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
        {images.map((img: string) => (
          <SwiperSlide key={img} className='rounded-xl'>
            <Image
              className='rounded-xl'
              src={`/products/${img}`}
              alt={img}
              width={600}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
