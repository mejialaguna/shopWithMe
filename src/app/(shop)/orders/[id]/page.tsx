'use client';

import { useEffect, useCallback } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Title } from '@/components/ui/Title';
import { IoCardOutline } from 'react-icons/io5';
import { useState } from 'react';
import { getOrderById } from '@/actions/order/get-order-by-id';
import { currencyFormatter } from '@/utils/currencyFormatter';
import { OrderItem, ProductOrderDetail } from '@/interfaces/product.orderDetail';
import Badge from '@/components/Badge';

interface OrdersProp {
  params: {
    id: string;
  };
}

export default function ({ params }: OrdersProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPaid, setIsPaid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productOrderDetail, setProductOrderDetail] = useState<ProductOrderDetail | undefined>(undefined);
  const { id } = params;

  useEffect(() => {
    setIsLoading(true)
  }, []);

  const getProductsOrder = useCallback(async() => {
    try {
      const { ok, productOrder } = await getOrderById(id);

      if (!ok) {
        setIsLoading(false);
        redirect('/');
      }

      setProductOrderDetail(productOrder);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch products order:', error);
    }
  }, [id]);

  useEffect(() => {
    getProductsOrder();
  }, [getProductsOrder]);

  if (!isLoading) {
    return (
      <div className='animate-pulse flex space-x-4'>
        <div className='rounded-full bg-slate-700 h-10 w-10'></div>
        <div className='flex-1 space-y-6 py-1'>
          <div className='h-2 bg-slate-700 rounded'></div>
          <div className='space-y-3'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-slate-700 rounded col-span-2'></div>
              <div className='h-2 bg-slate-700 rounded col-span-1'></div>
            </div>
            <div className='h-2 bg-slate-700 rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px] mb-8 sm:mb-0'>
        <Title title={`Order #${id.split('-')[0]}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <Badge isPaid={productOrderDetail?.IsPaid}>
              <IoCardOutline size={20} />
            </Badge>
            {productOrderDetail?.orderItems?.map((item: OrderItem) => (
              <div
                key={`${item?.product?.slug}-${item?.size}`}
                className='flex !mb-3.5'
              >
                <Image
                  src={`/products/${item?.product?.ProductImage[0].url}`}
                  alt={item?.product?.title}
                  width={100}
                  height={100}
                  sizes='100px'
                  className='rounded mr-5'
                />
                <div>
                  <p>{item?.product?.title}</p>
                  <div className='flex flex-row justify-between w-60'>
                    <p>Items {`(${item?.quantity}) X `}</p>
                    <p>${item?.price} </p>
                  </div>
                  <div className='flex flex-row justify-between w-60'>
                    <p className='font-bold'>SubTotal </p>
                    <p className='font-bold'>
                      {currencyFormatter(item.price * item?.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-white rounded-xl shadow-xl p-7 h-max'>
            <h2 className='text-2xl mb-2'>Shipment Address</h2>
            <div>
              <p>
                {productOrderDetail?.orderAddress?.firstName}{' '}
                {productOrderDetail?.orderAddress?.lastName}
              </p>
              <p>{productOrderDetail?.orderAddress?.address}</p>
              <p>{productOrderDetail?.orderAddress?.city}</p>
              <p>{productOrderDetail?.orderAddress?.country?.name}</p>
              <p>{productOrderDetail?.orderAddress?.zipcode} </p>
              <p>{productOrderDetail?.orderAddress?.phone}</p>
            </div>

            <hr className='w-full h-px bg-gray-200 mt-5 mb-10' />

            <h2 className='text-2xl mb-2'>Order View</h2>
            <div className='grid grid-cols-2'>
              <span className=''>No. Products</span>
              <span className='text-right'>
                {' '}
                {productOrderDetail?.itemsInOrder} Items
              </span>

              <span className=''>Subtotal</span>
              <span className='text-right'>
                ${productOrderDetail?.subtotal}
              </span>

              <span className=''>Tax.</span>
              <span className='text-right'> {productOrderDetail?.tax}%</span>

              <span className='mt-5 text-2xl'>Total</span>
              <span className='text-right mt-5 text-2xl'>
                ${productOrderDetail?.total}
              </span>
            </div>
            <Badge isPaid={productOrderDetail?.IsPaid}>
              <IoCardOutline size={20} />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
