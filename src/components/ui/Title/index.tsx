import { titleFonts } from '@/config/font';
import React from 'react';
interface TitleProp {
  title: string;
  subTitle?: string;
  customClasses?: string;
}

export const Title = ({ title, subTitle = '', customClasses = '' }: TitleProp) => {
  return (
    <div
      className={`flex flex-row justify-between mt-3 ${customClasses}`}
    >
      <h1
        className={`antialiased text-4xl font-semibold ${titleFonts.className}`}
      >
        {title}
      </h1>
      {subTitle && <h3 className='text-xl capitalize'>{subTitle}</h3>}
    </div>
  );
};
