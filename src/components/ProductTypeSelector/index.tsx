import React from 'react';
import { Category } from '@prisma/client';

type Gender = string[];
type CategoriesTypes = Category[];

interface Props {
  categories: Gender | CategoriesTypes;
}

export const ProductTypeSelector = ({ categories }: Props) => {
  return (
    <ul className='text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white justify-evenly'>
      {categories.map((category, idx) => {
        const categoryName = typeof category === 'string' ? category : category.name;

        return (
        <li
          className={`flex items-center ${idx !== categories.length - 1 && 'border-gray-200 sm:border-b-0 border-r dark:border-gray-600 pr-3 sm:pr-5'}`}
          key={categoryName}
        >
          <input
            id={categoryName}
            type='radio'
            value=''
            name='list-radio'
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
          />
          <label
            htmlFor={categoryName}
            className='w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {categoryName}
          </label>
        </li>
      )})}
    </ul>
  );
};
