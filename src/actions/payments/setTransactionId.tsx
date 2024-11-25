'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface OrderData {
  transactionId: string;
  orderId: string;
}

export const setTransactionId = async  ({transactionId, orderId}:OrderData) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in to place an order',
    };
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId},
    });

     if (!updatedOrder) {
       return {
         ok: false,
         message: `Order id ${orderId} not found`,
       };
     }

    return { ok: true };

  } catch (error) {
    return {
      ok: false,
      message: 'Error loading orders' + error,
    };
  }

}