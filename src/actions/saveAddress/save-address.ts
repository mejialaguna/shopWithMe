/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import prisma from '@/lib/prisma';

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zipcode: string;
  country: string;
  phone: string;
  city:string;
}

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // console.log({user}, {userId})
    const createdAddress = await createOrReplaceAddress(address, userId);
    return {
      success: createdAddress?.success,
      createdAddress,
      message: createdAddress?.message,
    };
  } catch (error) {
    return {
      success: false,
      message: 'address not saved',
    };
  }
};

export const deleteUserAddress = async (userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!storedAddress) return;

   await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });

  } catch (error) {
    return {
      success: false,
      message: 'address not saved',
    };
  }
};

export const createOrReplaceAddress = async (
  address: Address,
  userId: string
) => {
  try {
    const { country, ...rest } = address;
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    const addressToSaved = { ...rest, countryId: country, userId: userId };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSaved,
      });

      return {
        sucess: true,
        newAddress,
        message: 'address saved successfully',
      };
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: addressToSaved,
    });

    return {
      success: true,
      updatedAddress,
      message: 'address updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'address not saved',
    };
  }
};
