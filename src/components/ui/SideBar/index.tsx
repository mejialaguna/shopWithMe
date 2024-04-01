'use client';

import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { useUiStore } from '@/store/ui/ui-store';
import { logout } from '@/actions/auth/logout';
import { useSession } from 'next-auth/react';
import { AdminMenu } from '../AdminMenu';

export const SideBar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUiStore((state) => ({
    isSideMenuOpen: state.isSideMenuOpen,
    openSideMenu: state.openSideMenu,
    closeSideMenu: state.closeSideMenu,
  }));
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  const signOut = () => {
    logout();
    closeSideMenu();
  };

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
        className={`fixed p-5 right-0 top-0 w-80 bg-white h-screen z-20
        shadow-2xl transform transition-all duration-300
        ${!isSideMenuOpen && 'translate-x-full'}`}
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

        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={closeSideMenu}
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
          </>
        )}

        {isAuthenticated && (
          <button
            className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all w-full'
            onClick={signOut}
          >
            <IoLogOutOutline size={20} />
            <span className='ml-3 text-l'>Logout</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href='/login'
            className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={closeSideMenu}
          >
            <IoLogInOutline size={20} />
            <span className='ml-3 text-l'>Login</span>
          </Link>
        )}

        <hr className='w-full h-px bg-gray-200 my-10' />

        {isAuthenticated && isAdmin && <AdminMenu />}
      </nav>
    </div>
  );
};
