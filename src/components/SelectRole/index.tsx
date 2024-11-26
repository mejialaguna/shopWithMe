'use client';

import React, { useState, useCallback } from 'react';
import { User } from '@/interfaces/user.interface';
import { updateUserRole } from '@/actions/order/update-user-role';
import { Alert } from '../Alert';

const options = [
  { label: 'user', value: 'user' },
  { label: 'admin', value: 'admin' },
];

interface Props {
  user: User;
}

enum Role {
  admin = 'admin',
  user = 'user',
}

export const SelectRole = ({ user }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('user role updated');
  const [isOk, setIsOk] = useState(false);

   const handleSelectChange = useCallback( async (event: React.ChangeEvent<HTMLSelectElement>, userId: string) => {
      const role = event.target.value as Role; 
      if (!Object.values(Role).includes(role)) {
        // eslint-disable-next-line no-console
        console.error('Invalid role selected:', role);
        return;
      }
     const response = await updateUserRole({ userId, role });

     if (!response?.ok) {
       setIsOk(false);
       setMessage(response?.message || 'Error updating user role');
       setIsVisible(true);
     }

     setIsOk(true);
     setIsVisible(true);
     setTimeout(() => {
       setIsVisible(false);
     }, 3000);
  }, []);

  return (
    <>
      <select
        value={user?.role}
        onChange={(e) => handleSelectChange(e, user?.id)}
        className='w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none
        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isVisible && <Alert message={message} isVisible={isVisible} isOk={isOk}/>}
    </>
  );
};
