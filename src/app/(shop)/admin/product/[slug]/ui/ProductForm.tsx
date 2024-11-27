/* eslint-disable max-len */
'use client';

import { useCallback, useState } from 'react';
import { ProductTypeSelector } from '@/components/ProductTypeSelector';
import { useForm } from 'react-hook-form';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Product, ProductImage as ProductWithImage } from '@/interfaces';
import { Category } from '@prisma/client';
import { Alert } from '@/components/Alert';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { useRouter } from 'next/navigation';
import { createUpdateProduct } from '@/actions/product/createUpdateProduct';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

interface FormInputs {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;

  ProductImage: ProductWithImage[];
  images?: FileList;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const gendersTypes= ['Men', 'Women', 'Kid', 'Unisex'];

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const [isOk, setIsOk] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],

      images: undefined,
    },
  });
  const watchedErrors = watch();

  const onSubmit = useCallback(async (data: FormInputs) => {
    const formData = new FormData();
    const { images, id, ProductImage, ...productToSave } = data;

    if (product?.id) {
      formData.append('id', product.id ?? '');
    }


    for (const [key, value] of Object.entries(productToSave)) {
      console.log(`${key}`, value.toString());
      formData.append(`${key}`, value.toString());
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const { ok, message } = await createUpdateProduct(formData);

    if (!ok) {
      setIsOk(false);
      setAlertMessage(message);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return
    }

    setIsOk(true);
    setAlertMessage('Product updated');
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    //  router.replace(`/admin/product/${updatedProduct?.slug}`);
  }, []);
  
  // console.log(product);

  const handleAlert = useCallback(() => {
    const firstErrorKey = (Object.keys(watchedErrors) as (keyof FormInputs)[]).find((key) => !watchedErrors[key]);
    
    if (firstErrorKey) {
      setIsOk(false);
      setAlertMessage(`"${firstErrorKey.toUpperCase()}" field is required.`);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [watchedErrors]);

  const onSizeChanged = useCallback((size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes));
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
    >
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Title</span>
          <input
            type='text'
            className={`p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 px-3 ${errors['title'] ? 'outline-red-600' : 'focus:ring-indigo-600'}`}
            {...register('title', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className={`p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 px-3 ${errors['slug'] ? 'outline-red-600' : 'focus:ring-indigo-600'}`}
            {...register('slug', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span className='block text-sm/6 font-medium text-gray-900'>
            Descripción
          </span>
          <textarea
            rows={5}
            className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 px-3 ${errors['description'] ? 'outline-red-600' : 'focus:ring-indigo-600'}`}
            {...register('description', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className={`p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm/6 px-3 ${errors['price'] ? 'outline-red-600' : 'focus:ring-indigo-600'}`}
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            type='text'
            className={`p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm/6 px-3 ${errors['tags'] ? 'outline-red-600' : 'focus:ring-indigo-600'}`}
            {...register('tags', { required: true })}
          />
        </div>
        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <ProductTypeSelector
            options={gendersTypes.map((gender) => ({
              id: gender.toLowerCase(),
              name: gender,
            }))}
            registerProps={register('gender', { required: true })}
            errors={errors}
            name='gender'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <span>Categories</span>
          <ProductTypeSelector
            options={categories}
            registerProps={register('categoryId', { required: true })}
            errors={errors}
            name='categoryId'
          />
        </div>
        <button onClick={handleAlert} className='btn-primary w-full'>
          Save
        </button>
      </div>

      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span className='block text-sm/6 font-medium text-gray-900'>
            Choose quantity:
          </span>
          <input
            type='number'
            className='p-2 border rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-3'
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <span className='block text-sm/6 font-medium text-gray-900'>
              Sizes
            </span>
            <ul
              className='w-full flex text-sm font-medium text-gray-900
              bg-white border border-gray-200 rounded-lg dark:bg-gray-700
               dark:border-gray-600 dark:text-white pr-2'
            >
              {sizes.map((size, idx) => (
                <li
                  className={`w-full flex items-center justify-center ${
                    idx !== sizes.length - 1 &&
                    'border-gray-200sm:border-b-0 border-r dark:border-gray-600'
                  }`}
                  key={size}
                  onClick={() => onSizeChanged(size)}
                >
                  <input
                    id={size}
                    type='checkbox'
                    value={size}
                    // eslint-disable-next-line max-len
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer ${errors['sizes'] ? 'dark:focus:ring-red-600' : 'dark:focus:ring-blue-600'}`}
                    {...register('sizes', { required: true })}
                  />
                  <label
                    htmlFor={size}
                    className='py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer'
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
            <div
              className={`mt-2 flex justify-center rounded-lg border border-dashed
              border-gray-900/25 px-6 py-10`}
            >
              <div className='text-center'>
                <HiOutlinePhoto
                  aria-hidden='true'
                  className='mx-auto size-12 text-gray-300'
                />
                <div className='mt-4 flex text-sm/6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md font-semibold text-indigo-600
                    focus-within:outline-none hover:text-indigo-500'
                  >
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      className='sr-only'
                      type='file'
                      {...register('images')}
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
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id} className='relative group'>
                <ProductImage
                  alt={product.title ?? ''}
                  src={image.url}
                  width={300}
                  height={300}
                  className='rounded shadow-md'
                />
                <button
                  type='button'
                  // onClick={() => deleteProductImage(image.id, image.url)}
                  className='absolute top-2 right-2 bg-white p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.8)] hover:shadow-[0_6px_15px_rgba(0,0,0,1)] hover:scale-110 transition-all duration-400 ease-in-out active:scale-95 opacity-0 group-hover:opacity-100'
                >
                  <RiDeleteBin2Fill className='text-red-500 w-5 h-5' />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Alert message={alertMessage} isVisible={showAlert} isOk={isOk} />
      </div>
    </form>
  );
};
