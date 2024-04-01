'use server';

import { signIn } from '@/auth.config';

interface AuthenticationResult {
  success: boolean;
  message?: string;
}

export async function authenticate(
  prevState: AuthenticationResult | undefined,
  formData: FormData
): Promise<AuthenticationResult> {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return { success: true };

  } catch (error) {
    return {
      success: false,
      message: 'Wrong email or password',
    };
  }
}

export async function login(
  email: string,
  password: string
): Promise<AuthenticationResult> {
  try {
    await signIn('credentials', {
      email: email.toLowerCase(),
      password,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Wrong email or password',
    };
  }
}
