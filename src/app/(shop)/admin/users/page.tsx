export const revalidate = 0;

import { redirect } from 'next/navigation';
import { Title } from '@/components/ui/Title';
import { getAllUsers } from '@/actions/order/get-all-users';
import { GetAllUsersResponse } from '@/interfaces/user.interface';
import { SelectRole } from '@/components/SelectRole';

export default async function () {
  const response: GetAllUsersResponse = await getAllUsers();

  if (!response!.ok) {
    redirect('/auth/login');
  }

  const users = response?.users;

  return (
    <>
      <Title title='Users' customClasses='mb-3' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th
                scope='col'
                className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
              >
                Email
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
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr
                  key={user?.id}
                  className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {user?.email}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {user?.name}
                  </td>
                  <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <div className='w-64'>
                      <SelectRole user={user} />
                    </div>
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
