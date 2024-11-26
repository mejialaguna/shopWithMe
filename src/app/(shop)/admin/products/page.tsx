export const revalidate = 0;

import Link from 'next/link'
import { Title } from '@/components/ui/Title';
import { getPaginationProductWithImages } from '@/actions/product/product-pagination';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Pagination } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  };
}
const labels = ['Image', 'Title', 'Price', 'Gender', 'Inventory', 'Sizes'];

export default async function ({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = 10;
  const { products, totalPages, productsCount } = await getPaginationProductWithImages({ page, take });

  return (
    <>
      <Title title='Products' customClasses='mb-3' />

      <div className='flex justify-end mb-3'>
        <Link
          className='rounded-full bg-blue-500 text-slate-100 px-3 py-1 hover:bg-blue-700
          transition-all duration-300 ease-in-out hover:shadow-lg active:scale-95'
          href='/admin/product/add-new'
        >
          Add new product
        </Link>
      </div>

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b '>
            <tr>
              {labels?.map((label) => (
                <th
                  key={label}
                  scope='col'
                  className='text-sm font-medium text-gray-900 px-6 py-4 text-center'
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((order) => {
              return (
                <tr
                  key={order?.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <ProductImage
                      src={order?.images[0]}
                      width={80}
                      height={80}
                      alt={order.title}
                      className='w-20 h-20 object-cover rounded'
                    />
                  </td>
                  <td className='text-sm text-blue-500 font-light px-6 py-4 whitespace-nowrap'>
                    <Link
                      href={`/admin/product/${order?.slug}`}
                      className='hover:underline'
                    >
                      {order?.title}
                    </Link>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6'>
                    {order?.price}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    {order?.gender}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    {order?.inStock}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    {order?.sizes.join(' - ')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          take={take}
          productsCount={productsCount}
        />
      </div>
    </>
  );
}
