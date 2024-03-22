'use server';
import prisma from '@/lib/prisma';

interface PaginationsOptionsProps {
  page?: number;
  take?: number;
}

export const getPaginationProductWithImages = async ({
  page = 1,
  take = 10,
}: PaginationsOptionsProps) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 0) page = 1;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    const productsCount = await prisma.product.count({});
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
    // eslint-disable-next-line no-console
    console.error('somethig went wrong fetching all products', error);
  }
};
