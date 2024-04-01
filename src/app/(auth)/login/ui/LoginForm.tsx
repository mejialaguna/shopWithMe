/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions/auth/login';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoInformationCircleOutline,
} from 'react-icons/io5';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(state?.success) window.location.replace('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCredentials((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    []
  );

  const eyeIcon = useCallback(() => {
    return showPassword ? (
      <IoEyeOffOutline
        size={20}
        className='cursor-pointer'
        onClick={() => setShowPassword(!showPassword)}
      />
    ) : (
      <IoEyeOutline
        size={20}
        className='cursor-pointer'
        onClick={() => setShowPassword(!showPassword)}
      />
    );
  }, [showPassword]);

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
        placeholder='example@example.com'
        onChange={handleChange}
        required={true}
      />

      <label htmlFor='password'>Password</label>
      <div
        className={`flex flex-row justify-between px-5 py-2 border
        bg-gray-200 rounded items-center ${state && !state?.success ? 'mb-0' : 'mb-5'}`}
      >
        <input
          className='bg-gray-200 outline-none w-full'
          type={!showPassword ? 'password' : 'text'}
          // we need to add the name to the input to avoid the server error once dispatching the action
          name='password'
          placeholder='********'
          onChange={handleChange}
          required={true}
        />
        {eyeIcon()}
      </div>
      {state && !state?.success && (
        <div
          className='flex h-8 items-end space-x-1 mb-2 fade-in'
          aria-live='polite'
          aria-atomic='true'
        >
          <IoInformationCircleOutline className='h-5 w-5 text-red-500' />
          <p className='text-sm text-red-500'>{state?.message}</p>
        </div>
      )}

      <LoginButton credentials={credentials} />

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/signup' className='btn-secondary text-center'>
        Create new Account
      </Link>
    </form>
  );
};

interface LoginButtonProps {
  credentials: { email: string; password: string };
}

const LoginButton = ({ credentials }: LoginButtonProps) => {
  const { pending } = useFormStatus();
  const { email, password } = credentials;
  return (
    <button
      type='submit'
      className={`${pending || !email || !password ? 'btn-secondary cursor-not-allowed' : 'btn-primary'}`}
      disabled={pending || !email || !password}
    >
      Login
    </button>
  );
};
