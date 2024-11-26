'use client';

import React from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { setTransactionId } from '@/actions/payments/setTransactionId';
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payment';

interface PayPalButtonProps {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-4 py-1'>
          <div className='h-2 bg-slate-700 rounded p-5' />
          <div className='h-2 bg-slate-700 rounded p-5' />
          <div className='h-2 bg-slate-700 rounded p-5' />
          <div className='space-y-3 justify-items-center'>
            <div className='w-44'>
              <div className='h-2 bg-slate-700 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    try {

       if (!amount || isNaN(Number(amount))) {
         throw new Error('Invalid amount provided');
       }

      const transactionId = await actions.order.create({
        purchase_units: [
          {
            invoice_id: orderId,
            amount: {
              currency_code: 'USD',
              value: amount.toFixed(2),
            },
          },
        ],
        intent: 'CAPTURE',
      });

       if (!transactionId) {
         throw new Error(
           'Something went wrong with the transaction.'
         );
       }

      const { ok } = await setTransactionId({ transactionId, orderId });

      if (!ok) {
        throw new Error('something went wrong updating transactionId');
      }

      return transactionId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`Order creation failed: ${error?.message}`);
    }
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const details = await actions.order?.capture();

    if (!details || !details.id) return;

    await paypalCheckPayment(details!.id);
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      style={{ color: 'blue', shape: 'pill', label: 'pay' }}
    />
  );
};
