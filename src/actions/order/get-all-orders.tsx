'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getAllOrders = async () => {
  const session = await auth();

  if (session!.user!.role !== 'admin') {
    return {
      ok: false,
      message: 'Acces denied contact your administrator.',
    };
  }

  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        IsPaid: true, 
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error loading orders' + error,
    };
  }
};
