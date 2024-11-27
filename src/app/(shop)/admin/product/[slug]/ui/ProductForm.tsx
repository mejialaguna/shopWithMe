import { ProductTypeSelector } from '@/components/ProductTypeSelector';
import { Product } from '@/interfaces';
import { Category } from '@prisma/client';
import { HiOutlinePhoto } from 'react-icons/hi2';

interface Props {
  products: Product;
  categories: Category[]
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;

  images?: FileList;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const gendersTypes= ['Men', 'Women', 'Kid', 'Unisex'];

export const ProductForm = ({ products, categories }: Props) => {

  return (
    <form className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'>
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Título</span>
          <input
            type='text'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span className='block text-sm/6 font-medium text-gray-900'>
            Descripción
          </span>
          <textarea
            rows={5}
            className='block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            type='text'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <ProductTypeSelector categories={gendersTypes} />
        </div>
        <div className='flex flex-col mb-2'>
          <span>Categories</span>
          <ProductTypeSelector categories={categories} />
        </div>
        <button className='btn-primary w-full'>Guardar</button>
      </div>

      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span className='block text-sm/6 font-medium text-gray-900'>
            Choose quantity:
          </span>
          <input
            type='number'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
          />
        </div>
        {/* As checkboxes */}
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <span className='block text-sm/6 font-medium text-gray-900'>
              Sizes
            </span>
            <ul className='items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white justify-around'>
              {sizes.map((size, idx) => (
                // bg-blue-500 text-white <--- si está seleccionado
                <li
                  className={`flex items-center ${idx !== sizes.length - 1 && 'border-gray-200 sm:border-b-0 border-r dark:border-gray-600 pr-3 sm:pr-5'}`}
                  key={size}
                  // onClick={() => onSizeChanged(size)}
                >
                  <input
                    id={size}
                    type='checkbox'
                    value=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                  />
                  <label
                    htmlFor={size}
                    className='w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-full'>
            <label
              htmlFor='cover-photo'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Product Image
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                <HiOutlinePhoto
                  aria-hidden='true'
                  className='mx-auto size-12 text-gray-300'
                />
                <div className='mt-4 flex text-sm/6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      className='sr-only'
                      type='file'
                      // {...register('images')}
                      multiple
                      accept='image/png, image/jpeg, image/avif'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs/5 text-gray-600'>
                  PNG, JPG, avif up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
