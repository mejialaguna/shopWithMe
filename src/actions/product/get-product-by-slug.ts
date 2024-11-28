'use server';
import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!product && slug === 'new') return null;

    if (!product) {
      throw new Error(`${slug} not found  `)
    }

    return {
      ...product,
      images: product?.ProductImage.map((image: { url: string }) => image.url)
    };

  } catch (error) {
    throw new Error(
      `something went wrong fetching product with slug ${slug}, ${error}`
    );
  }
};
