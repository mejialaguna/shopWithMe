'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Gender, Product, Size } from '@prisma/client';
import { auth } from '@/auth.config';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

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
      const data = {
        ...rest,
        sizes: {
          set: rest.sizes as Size[],
        },
        tags: {
          set: tagsArray,
        },
      };

      if (id) {
        // updating new product
        product = await prisma.product.update({
          where: { id },
          data,
        });
      } else {
        // Creating new product
        product = await prisma.product.create({
          data,
        });
      }

      // Proceso de carga y guardado de imagenes
      // Recorrer las imagenes y guardarlas
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[]);
        if (!images) {
          throw new Error('something went wrong loading image, rolling back');
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product: product,
        message: id ? 'Product updated' : 'Product created',
      };
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      message: prismaTx.message,
      product: prismaTx.product,
    };

  } catch (error) {
    return {
      ok: false,
      message: 'Error updating product' + error,
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        // Convert the File to a Base64 string
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        // Use Cloudinary's uploader with a transformation to PNG
        const result = await cloudinary.uploader.upload(
          `data:${image.type};base64,${base64Image}`,
          {
            folder: process.env.CLOUDINARY_FOLDER, // Specify your folder
            transformation: [
              { width: 500, height: 500, crop: 'fill' }, // Resize to 500x500 (optional)
              { fetch_format: 'png' }, // Convert to PNG format
              { quality: 'auto' }, // Automatically optimize quality
            ],
          }
        );

        return result.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Filter out null results
    return uploadedImages.filter((url) => url !== null);
  } catch (error) {
    console.error('Error processing images:', error);
    return null;
  }
};

export const deleteProductImage = async (id: number, cloudinaryUrl: string ) => {
  if (!cloudinaryUrl?.startsWith('http')) {
    const message = !cloudinaryUrl?.startsWith('http') ? 'cant delete this image from the file system' : 'missing image id OR image url'

    return {
      ok: false,
      error: message,
    };
  };

  const match = cloudinaryUrl.match(/\/v\d+\/(.+)\.\w+$/);
  const cloudinaryId = match ? match[1] : '';

  try {
    const { result } = await cloudinary.uploader.destroy(cloudinaryId);

    if (result === 'not found') {
      return {
        ok: false,
        message: 'Something went wrong deleting the img.',
      };
    }

    const { product } = await prisma.productImage.delete({
      where: { id },
      select: {
        product: {
          select:{
            slug: true
          }
        }
      }
    })

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      message: 'Image deleted',
    }

  } catch (error) {
    return {
      ok: false,
      message: `${error}, No se pudo eliminar la imagen`,
    };
  }
};
