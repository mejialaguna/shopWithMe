/* eslint-disable no-console */
import prisma from '../lib/prisma';
import { countries } from './countries-seed';
import { initialData } from './seed';


async function main() {
  const { categories, products, users } = initialData;

  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.user.createMany({
    data: users
  })

  // const categorieawait sData = categories.map((name) => ({ name }));
  // await prisma.category.createMany({
  //   data: categoriesData,
  // });

  await prisma.country.createMany({data: countries})

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }
  const categoriesDb = await prisma.category.findMany();

  const categoriesMap = categoriesDb.reduce(
    (acc, category) => {
      acc[category.name.toLowerCase()] = category.id;
      return acc;
    },
    {} as Record<string, string>
  );

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // ?? using createMany because the images map contains an array of more than one object.
    const dbImage = await prisma.productImage.createMany({
      data: images.map((image) => ({ url: image, productId: dbProduct.id })),
    });
    console.log('====>', dbImage);
  });

  console.log('done uploading the seeds');
}

(() => {
  main();
})();

//  ?? info ==> The first approach of creating data inside prisma creates a new array (categoriesData) using map(), which might consume more memory, especially for large arrays.

// ?? the second approach of creating data inside prisma might perform slightly better due to not creating an intermediate array like in the first approach.
