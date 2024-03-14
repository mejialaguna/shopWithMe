import { titleFonts } from '@/config/font';
import React from 'react';
interface TitleProp {
  title: string;
  subTitle?: string;
  customClasses?: string;
}

export const Title = ({ title, subTitle = '', customClasses = '' }: TitleProp) => {
  console.log({ title, subTitle, customClasses });
  return (
    <div className={`mt-3 ${customClasses}`}>
      <h1
        className={`antialiased text-4xl font-semibold my-7 ${titleFonts.className}`}
      >
        {title}
      </h1>
      {subTitle && <h3 className='text-xl mb-5'>
        {subTitle}
      </h3> }
    </div>
  );
};
