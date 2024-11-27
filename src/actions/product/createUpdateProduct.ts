'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const session = await auth();
  
  if (session!.user!.role !== 'admin') {
    return {
      ok: false,
      message: 'Acces denied contact your administrator.',
    };
  }

  const productToUpdate = Object.fromEntries(formData);
  const sanetizedProduct = productSchema.safeParse(productToUpdate);

   if (!sanetizedProduct.success) {
     const key = Object.keys(sanetizedProduct.error.formErrors.fieldErrors)[0];
     const message = Object.values(sanetizedProduct.error.formErrors.fieldErrors)[0];

     return { ok: false, message: `the ${key} field ${message}` };
   }

  const product = sanetizedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // updating new product
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // Creating new product
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      // if (formData.getAll('images')) {
      //   // [https://url.jpg, https://url.jpg]
      //   const images = await uploadImages(formData.getAll('images') as File[]);
      //   if (!images) {
      //     throw new Error('No se pudo cargar las imágenes, rollingback');
      //   }

      //   await prisma.productImage.createMany({
      //     data: images.map((image) => ({
      //       url: image!,
      //       productId: product.id,
      //     })),
      //   });
      // }

      return {
        product,
      };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    console.log('product', prismaTx.product)
    return {
      ok: true,
      product: prismaTx.product,
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error updating product' + error,
    };
  }
};