'use client';

import Link from 'next/link';
import { login } from '@/actions/auth/login';
import { signUpUser } from '@/actions/auth/signUp';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [outline, setOutline] = useState(false);
  const [view, setView] = useState('password');
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const eyeIcon = useCallback(() => {
    return view === 'password' ? (
      <IoEyeOutline
        size={20}
        className='cursor-pointer'
        onClick={() => {
          setView('text'), setOutline(true);
        }}
      />
    ) : (
      <IoEyeOffOutline
        size={20}
        className='cursor-pointer'
        onClick={() => {
          setView('password'), setOutline(true);
        }}
      />
    );
  }, [view]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    const response = await signUpUser(name, email, password);

    if (!response?.ok) {
      setErrorMessage(response?.message);
      return;
    }

    login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>Name</label>
      <input
        className={`px-5 py-2 border bg-gray-200 rounded  ${errors.name?.type === 'required' ? 'outline-red-600 mb-1' : 'mb-5'}`}
        type='text'
        autoFocus
        {...register('name', { required: 'Name is required' })}
      />

      {errors.name?.type === 'required' && (
        <small className='text-red-600 mb-3'>{errors.name.message}</small>
      )}

      <label htmlFor='email'>Email</label>
      <input
        className={`px-5 py-2 border bg-gray-200 rounded  ${errors.email?.type === 'required' ? 'outline-red-600 mb-1' : 'mb-5'}`}
        type='email'
        placeholder='example@example.com'
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email should be valid: example@example.com',
          },
        })}
      />

      {errors.email?.type === 'required' && (
        <small className='text-red-600 mb-3'>{errors.email.message}</small>
      )}

      <label htmlFor='password'>Password</label>
      <div
        className={`flex flex-row justify-between px-5 py-2
        bg-gray-200 rounded items-center ${outline && 'border-2 border-[#115FCC]'}
         ${errors?.password?.type ? 'mb-3 border-red-600 ' : 'mb-5'}`}
      >
        <input
          className='bg-gray-200 outline-none w-full'
          type={view}
          placeholder='******'
          {...register('password', {
            required: 'password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 8 characters',
            },
          })}
          onFocus={() => setOutline(true)}
          onBlur={() => setOutline(false)}
        />
        {eyeIcon()}
      </div>
      {!!errors?.password?.type && (
        <small className='text-red-600 mb-3'>{errors?.password?.message}</small>
      )}

      {errorMessage && (
        <small className='text-red-600 mb-3'>{errorMessage}</small>
      )}

      <button className='btn-primary'>Sign up</button>

      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>Or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/login' className='btn-secondary text-center'>
        Login
      </Link>
    </form>
  );
};
