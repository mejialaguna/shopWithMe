export const revalidate = 0;

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Title } from '@/components/ui/Title';
import { IoCardOutline } from 'react-icons/io5';
import { getAllOrders } from '@/actions/order/get-all-orders';

export default async function () {
  const { ok, orders: userOrders } = await getAllOrders();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title='Orders' customClasses='mb-3' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                #ID
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Name
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Status
              </th>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {userOrders?.map((order) => {
              return (
                <tr
                  key={order?.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {order?.id?.split('-')[0]}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {`${order?.orderAddress?.firstName}  ${order?.orderAddress?.lastName}`}
                  </td>
                  <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <IoCardOutline
                      className={`${!order?.IsPaid ? 'text-red-400' : 'text-green-800'}`}
                    />
                    <span
                      className={`mx-2 ${!order?.IsPaid ? 'text-red-400' : 'text-green-800'}`}
                    >
                      {order?.IsPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 '>
                    <Link
                      href={`/orders/${order?.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      See Order
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
