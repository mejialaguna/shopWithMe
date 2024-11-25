'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in to place an order',
    };
  }

  try {
    const userOrders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderAddress: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      },
    });

    return {
      ok: true,
      userOrders,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Error loading orders',
    };
  }
}