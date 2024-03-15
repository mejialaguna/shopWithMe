'use client';

import React from 'react';
import { useUiStore } from '@/store/ui/ui-store';

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
