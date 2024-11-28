import Link from 'next/link';
import React from 'react'
import { IoShirtOutline, IoTicketOutline, IoPeopleOutline } from 'react-icons/io5';

interface Props {
  closeSideMenu: () => void;
}

export const AdminMenu = ({ closeSideMenu }: Props) => {
  return (
    <div>
      <Link
        href='/admin/products'
        onClick={closeSideMenu}
        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '
      >
        <IoShirtOutline size={20} />
        <span className='ml-3 text-l'>Products</span>
      </Link>

      <Link
        href='/admin/orders'
        onClick={closeSideMenu}
        className='flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all '
      >
        <IoTicketOutline size={20} />
        <span className='ml-3 text-l'>Orders</span>
      </Link>
      <Link
        href='/admin/users'
        onClick={closeSideMenu}
        className='flex items-center mt-6 p-2 hover:bg-gray-100 rounded transition-all '
      >
        <IoPeopleOutline size={20} />
        <span className='ml-3 text-l'>Users</span>
      </Link>
    </div>
  );
};
