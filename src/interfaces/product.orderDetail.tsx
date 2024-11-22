export interface ProductOrderDetail {
  id: string;
  subtotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  IsPaid: boolean;
  paidAt: PaidAt;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  orderAddress: OrderAddress | null;
  orderItems: OrderItem[];
}

type PaidAt = null | Date;

interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string | null;
  zipcode: string;
  phone: string;
  city: string;
  countryId: string;
  country: Country;
  orderId: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  price: number;
  product: Product;
}

interface Country {
  id: string;
  name: string;
}

interface Product {
  title: string;
  slug: string;
  ProductImage: ProductImage[];
}

interface ProductImage {
  url: string;
}
