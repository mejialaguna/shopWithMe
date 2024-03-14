'use client';
import { useUiStore } from '@/store/ui/ui-store';
import React from 'react';

export const Buttom = () => {
  const { openSideMenu } = useUiStore((state) => ({
    openSideMenu: state.openSideMenu,
  }));

  return (
    <button
      className='p-2 rounded-md transition-all hover:bg-gray-100'
      onClick={openSideMenu}
    >
      menu
    </button>
  );
};
