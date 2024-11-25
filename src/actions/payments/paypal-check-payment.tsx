'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { PayPalOrderStatusResponse } from '@/interfaces/paypal.interface';

export const paypalCheckPayment = async (paypalTransactionId: string, orderId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'something went wrong generating token.',
    };
  }

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: 'Something went wrong verifying the payment.',
    };
  }

  const { status, purchase_units } = resp;
  console.log({ status, purchase_units });
  // console.log('==========>', purchase_units[0]);
  // const { invoice_id: orderId } = purchase_units[0];
  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Order still pending.',
    };
  }
  console.log('orderId==========>', orderId)
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        IsPaid: true,
        paidAt: new Date(),
      },
    });
    
    console.log('updatedOrder', updatedOrder);

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true
    }

    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '500 - cant proccess the payment'
    }
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      // to make the call does not cache the response.
      ...requestOptions,
      cache: 'no-store',
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse|null>  => {

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Bearer ${ bearerToken }`
  );

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      // to make the call does not cache the response.
      ...requestOptions,
      cache: 'no-store'
    }).then( r => r.json() );
    return resp;

  } catch (error) {
    console.log(error);
    return null;
  }

};
