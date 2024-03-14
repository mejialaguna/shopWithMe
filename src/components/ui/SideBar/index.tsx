'use client'
import React from 'react';
import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useUiStore } from '@/store/ui/ui-store';
export const SideBar = () => {
 const { isSideMenuOpen, closeSideMenu } = useUiStore(
   (state) => ({
     isSideMenuOpen: state.isSideMenuOpen,
     openSideMenu: state.openSideMenu,
     closeSideMenu: state.closeSideMenu,
   })
 );

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-40' />
          <div
            className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
            onClick={closeSideMenu}
          />
        </>
      )}

      <nav
        className={`fixed p-5 right-0 top-0 w-80 bg-white h-screen z-20 shadow-2xl transform transition-all duration-300 ${!isSideMenuOpen && 'translate-x-full'}`}
      >
        <IoCloseOutline
          className='absolute right-5 cursor-pointer'
          onClick={closeSideMenu}
        />
        <div className='relative mt-14'>
          <IoSearchOutline className='absolute top-3 left-2' />
          <input
            className='w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-b-gray-200 focus:outline focus:border-blue-500'
            type='text'
            placeholder='search'
          />
        </div>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoPersonOutline size={20} />
          <span className='ml-3 text-l'>Profile</span>
        </Link>
        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline size={20} />
          <span className='ml-3 text-l'>Orders</span>
        </Link>
        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoLogInOutline size={20} />
          <span className='ml-3 text-l'>Login</span>
        </Link>
        <Link
          href='/'
          className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoLogOutOutline size={20} />
          <span className='ml-3 text-l'>Logout</span>
        </Link>

        <hr className='w-full h-px bg-gray-200 my-10' />

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoShirtOutline size={20} />
          <span className='ml-3 text-l'>Products</span>
        </Link>

        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoTicketOutline size={20} />
          <span className='ml-3 text-l'>Orders</span>
        </Link>
        <Link
          href='/'
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
        >
          <IoPeopleOutline size={20} />
          <span className='ml-3 text-l'>Users</span>
        </Link>
      </nav>
    </div>
  );
};
