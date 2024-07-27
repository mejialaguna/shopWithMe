'use server';

import prisma from '@/lib/prisma';

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
      name: 'asc',
    }});
    if (!countries.length) {
      throw new Error('theres no countries on the DB');
    }

    return countries;
  } catch (error) {
    throw new Error(
      `something went wrong fetching the countries, ${error}`
    );
  }
};
