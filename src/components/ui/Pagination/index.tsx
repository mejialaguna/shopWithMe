/* eslint-disable no-console */
'use client';

import React from 'react';
import Link from 'next/link';
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from 'react-icons/io5';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { generatePaginationNumber } from '@/utils/generatePathUrl';

interface PaginationProps {
  totalPages: number;
  take: number;
  productsCount: number;
}
export const Pagination = ({
  totalPages,
  take,
  productsCount,
}: PaginationProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(+currentPageString) ? 1 : +currentPageString;

  const lastItemIndex = Math.min(currentPage * take, productsCount);
  const showingCurrentCount = Math.min(
    (currentPage - 1) * take + 1,
    productsCount
  );

  if (currentPage < 1 || isNaN(+currentPageString)) {
    redirect(pathName);
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathName}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  const allPages = generatePaginationNumber(currentPage, totalPages);

  return (
    <div className='flex items-center justify-between px-4 py-3 sm:px-6 mb-8'>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{showingCurrentCount}</span>{' '}
            to <span className='font-medium'>{lastItemIndex}</span> of{' '}
            <span className='font-medium'>{productsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <Link
              href={createPageUrl(currentPage - 1)}
              className='relative inline-flex items-center rounded-l-md px-2 bg-gray-50
              py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <IoChevronBackCircleOutline
                className='h-5 w-5'
                aria-hidden='true'
              />
            </Link>
            {allPages.map((page) => (
              <Link
                key={page}
                href={createPageUrl(page)}
                aria-current='page'
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                bg-gray-50 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                focus:z-20 focus:outline-offset-0 hover:bg-transparent transition-all duration-300 ${
                  page === currentPage &&
                  'bg-indigo-600 hover:bg-indigo-400 text-white'
                }`}
              >
                {page}
              </Link>
            ))}
            <Link
              href={createPageUrl(currentPage + 1)}
              className='relative inline-flex items-center rounded-r-md px-2 bg-gray-50
              py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Next</span>
              <IoChevronForwardCircleOutline
                className='h-5 w-5'
                aria-hidden='true'
              />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
