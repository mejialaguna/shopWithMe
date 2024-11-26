'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

enum Role {
  admin = 'admin',
  user = 'user',
}

interface Props {
  userId: string;
  role: Role;
}

export const updateUserRole = async ({userId, role}: Props) => {
   try {
     const users = await prisma.user.update({
       where: { id: userId },
       data: {
         role: role
       },
     });

     revalidatePath('/admin/users');

     return {
       ok: true,
       users,
     };

   } catch (error) {
     return {
       ok: false,
       message: 'Error updating user role' + error,
     };
   }
}