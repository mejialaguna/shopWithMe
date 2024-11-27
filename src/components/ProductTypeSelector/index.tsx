/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
interface Option {
  [key: string]: any;
}
interface Props {
  options: Option[];
  registerProps: any;
  labelKey?: string;
  valueKey?: string;
  errors?: any;
  name?: string;
}

export const ProductTypeSelector = ({ options, registerProps, labelKey = 'name', valueKey = 'id', errors, name }: Props) => {

  return (
    <ul
      className='w-full flex text-sm font-medium text-gray-900 bg-white border
      border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600
      dark:text-white justify-evenly'
    >
      {options?.map((option, idx) => (
        <li
          key={option[valueKey]}
          className={`w-full flex items-center justify-center ${
            idx !== options.length - 1 &&
            'border-gray-200 sm:border-b-0 border-r dark:border-gray-600'
          }`}
        >
          <input
            id={option[valueKey]}
            type='radio'
            value={option[valueKey]}
            // eslint-disable-next-line max-len
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 ${errors[`${name}`] ? 'dark:focus:ring-red-600' : 'dark:focus:ring-blue-600'}`}
            {...registerProps}
          />
          <label
            htmlFor={option[valueKey]}
            className='py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {option[labelKey]}
          </label>
        </li>
      ))}
    </ul>
  );
};
