'use server';
import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) {
      throw new Error(`${slug} not found  `)
    }

    const { ProductImage, ...res } = product
    return {
      ...res,
      images: ProductImage.map((image: {url: string}) => image.url),
    };

  } catch (error) {
    throw new Error(
      `something went wrong fetching product with slug ${slug}, ${error}`
    );
  }
};
