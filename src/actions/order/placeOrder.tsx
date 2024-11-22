'use server';

import { Address } from '@/interfaces/address.interfaces';
import {type Size } from '../../interfaces/products.interfaces';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in to place an order',
    };
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsIds.map((product) => product.productId),
      },
    }
  })

  const totalOrderItem = productsIds?.reduce((acc, product) => acc + product.quantity, 0);

  const {subtotal, total, tax} = productsIds.reduce((acc, productItem) => {
    const product = products.find((p) => p?.id === productItem?.productId);

    if (!product) throw new Error(`product item id ${productItem.productId} does exist`);

    const productQuantity = productItem?.quantity;
    const subtotal = productQuantity * product?.price;
    const tax = subtotal * 0.0725;
    acc.subtotal += subtotal;
    acc.tax += tax;
    acc.total += subtotal + tax;

    return acc;
  }, { subtotal: 0, total: 0, tax: 0 })

  try {
    const prismaTransaction = await prisma?.$transaction(async (tx) => {
      const updatedProduct = products?.map((product) => {
        const productQuantity = productsIds
          ?.filter((p) => p.productId === product.id)
          .reduce((acc, totalItems) => totalItems.quantity + acc, 0);

        if (!productQuantity)
          throw new Error(`product item id ${product.id} does exist`);

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProduct);

      for (const product of updatedProducts) {
        if (product.inStock < 0) {
          throw new Error(
            `${product?.title}, does not have enough stock.`
          );
        }
      }

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: totalOrderItem,
          total: total,
          subtotal: subtotal,
          tax: tax,
          orderItems: {
            createMany: {
              data: productsIds.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.productId,
                price:
                  products.find((p) => p.id === product.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      const { country, ...rest } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...rest,
          countryId: country,
          orderId: order?.id,
        },
      });

      return {
        order,
        updatedProducts,
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTransaction.order,
      prismaTx: prismaTransaction,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return {
      ok: false,
      message: `This item ${error.message}`,
    };
  }
}






