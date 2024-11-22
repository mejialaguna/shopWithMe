'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in to place an order',
    };
  }

  try {
    const productOrder = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderAddress: {
          include: {
            country: true, // Include the related country information
          },
        },
        orderItems: {
          select: {
            productId: true,
            quantity: true,
            size: true,
            price: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!productOrder) {
      throw new Error('No existe el pedidos');
    }

    if (session?.user?.role === 'user' && session?.user?.id !== productOrder?.userId) { 
      throw new Error('this order doesnt belong to current user');
    }

    return {
      ok: true,
      productOrder,
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return {
      ok: false,
      message: error?.message,
    }
  }
};