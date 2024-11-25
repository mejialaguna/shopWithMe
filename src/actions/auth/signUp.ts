'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userAlreadyExist = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (userAlreadyExist) {
      return {
        ok: false,
        message: `Email ${email} already exists`,
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'something went wrong creating user',
    };
  }
};
