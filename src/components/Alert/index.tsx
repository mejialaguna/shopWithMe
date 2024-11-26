/* eslint-disable max-len */
import React, { memo } from 'react';
import { CgDanger } from 'react-icons/cg';

interface AlertProps {
  message: string | undefined;
  isVisible: boolean;
  isOk?: boolean;
}

export const Alert = memo(({ message, isVisible, isOk= false }: AlertProps) => {
  return (
    <div
      className={`flex items-center fixed bottom-5 left-0 mb-4 ml-4 p-4 text-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } ${isOk ? 'bg-green-500' : 'bg-red-500'}`}
      role='alert'
    >
      <CgDanger size={25} className='mr-2' />
      <p>{message}</p>
    </div>
  );
});
// {${!order?.IsPaid ? 'bg-red-400' : 'bg-green-800'}}