'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { setUserAddress, deleteUserAddress } from '@/actions/saveAddress/save-address';
import { useAddressStore } from '@/store/address/address-store';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
  remenberAddress: string;
};

interface Country {
  name: string;
  id: string;
}

interface AddressFormProps {
  countries: Country[];
}

export const AddressForm = ({ countries }: AddressFormProps) => {
  const router = useRouter();
  const isRememberAddressRequire = useMemo(
    () => window.localStorage.getItem('remenberAddress') || '',
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({ defaultValues: { remenberAddress: isRememberAddressRequire } });

  const { setAdress, address } = useAddressStore((state) => state);
  const { data: session } = useSession({
    required: true
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { remenberAddress, ...rest } = data;
    setAdress(rest);

    if (remenberAddress) {
      window.localStorage.setItem('remenberAddress', 'true');
      await setUserAddress(rest, session!.user?.id);
    } else {
      window.localStorage.removeItem('remenberAddress');
      await deleteUserAddress(session!.user?.id);
    }

    router.push('/checkout');
  };

  const showErrorMessage = (value: keyof FormInputs) => {
    const error = errors[value];
    return (
      error && <small className='text-red-600 fade-in'>{error.message}</small>
    );
  };

  const changeBorderOnError = (value: keyof FormInputs) => {
    const error = errors[value];
    return error ? 'outline-red-600' : '';
  };

  useEffect(() => {
    if (address.firstName) {
      // reset function will reset the form fields, the data should have the same values as the form fields
      reset(address);
    }
  }, [address]);

  return (
    <form
      className='grid grid-cols-1 gap-x-2 sm:gap-x-5 sm:grid-cols-2'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col'>
        <span>First Name</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['firstName'] && changeBorderOnError('firstName')}`}
          autoFocus
          {...register('firstName', { required: 'Name is required' })}
        />
        {errors['firstName'] ? (
          showErrorMessage('firstName')
        ) : (
          <div className='mb-3' />
        )}
      </div>

      <div className='flex flex-col'>
        <span>Last Name</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['lastName'] && changeBorderOnError('lastName')}`}
          {...register('lastName', { required: 'Last Name is required' })}
        />
        {errors['lastName'] ? (
          showErrorMessage('lastName')
        ) : (
          <div className='mb-3' />
        )}
      </div>

      <div className='flex flex-col'>
        <span>Address</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['address'] && changeBorderOnError('address')}`}
          {...register('address', { required: 'Address is required' })}
        />
        {errors['address'] ? (
          showErrorMessage('address')
        ) : (
          <div className='mb-3' />
        )}
      </div>

      <div className='flex flex-col'>
        <span>Address 2 (optional)</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('address2')}
        />
      </div>

      <div className='flex flex-col'>
        <span>Zip-Code</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['zipcode'] && changeBorderOnError('zipcode')}`}
          {...register('zipcode', {
            required: 'zipcode is required',
            pattern: {
              value: /^\d+$/,
              message: 'zipcode should be valid',
            },
            minLength: {
              value: 5,
              message: 'Zipcode should be at least 5 characters',
            },
          })}
        />
        {errors['zipcode'] ? (
          showErrorMessage('zipcode')
        ) : (
          <div className='mb-3' />
        )}
      </div>

      <div className='flex flex-col'>
        <span>City</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['city'] && changeBorderOnError('city')}`}
          {...register('city', { required: 'City is required' })}
        />
        {errors['city'] ? showErrorMessage('city') : <div className='mb-3' />}
      </div>

      <div className='flex flex-col'>
        <span>Country</span>
        <select
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['country'] && changeBorderOnError('country')}`}
          {...register('country', { required: 'Country is required' })}
        >
          <option value=''>Select</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {errors['country'] ? (
          showErrorMessage('country')
        ) : (
          <div className='mb-3' />
        )}
      </div>

      <div className='flex flex-col'>
        <span>Phone</span>
        <input
          type='text'
          className={`p-2 border rounded-md bg-gray-200 ${!!errors['phone'] && changeBorderOnError('phone')}`}
          {...register('phone', { required: 'Phone is required' })}
        />
        {errors['phone'] ? showErrorMessage('phone') : <div className='mb-3' />}
      </div>

      <div className='flex flex-col sm:mt-10'>
        <label className='inline-flex items-center mb-5 cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            {...register('remenberAddress')}
          />
          <div
            className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none
          peer-focus:ring-4 peer-focus:ring-transparent rounded-full
          dark:bg-gray-700 peer-checked:after:translate-x-full
          rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
          after:content-[''] after:absolute after:top-[2px] after:start-[2px]
          after:bg-white after:border-gray-300 after:border after:rounded-full
          after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          />
          <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-700'>
            Remember delivery address
          </span>
        </label>

        <div className='group flex relative'>
          <button
            disabled={!isValid}
            type='submit'
            className={`flex w-full sm:w-1/2 justify-center ${!isValid ? 'btn-disabled' : 'btn-primary'} `}
          >
            Next
          </button>
          {!isValid && (
            <span
              className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1
              text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto'
            >
              Fill out Form to Proceed
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
