'use server';

import { auth } from '@/auth.config';
import { GetAllUsersResponse } from '@/interfaces/user.interface';
import prisma from '@/lib/prisma';

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const session = await auth();

  if (session!.user!.role !== 'admin') {
    return {
      ok: false,
      message: 'Acces denied contact your administrator.',
    };
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return {
      ok: true,
      users,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error loading orders' + error,
    };
  }
};