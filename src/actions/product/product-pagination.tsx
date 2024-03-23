'use server';
import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationsOptionsProps {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginationProductWithImages = async ({
  page = 1,
  take = 10,
  gender,
}: PaginationsOptionsProps) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 0) page = 1;

  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      take: take,
      skip: (page - 1) * take,
      where: {
        gender: gender,
      },
    });

    const productsCount = await prisma.product.count({
      where: { gender: gender },
    });

    return {
      currentPage: page,
      productsCount,
      totalPages: Math.ceil(productsCount / take),
      products: products.map((product) => {
        const { ProductImage, ...res } = product;
        return {
          ...res,
          images: ProductImage.map((image) => image.url),
        };
      }),
    };
  } catch (error) {
    throw new Error(`somethig went wrong fetching all products, ${error}`);
  }
};
