// ── Category ──
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

// ── Product (matches SRS Section 13, Product schema) ──
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPercent: number;
  category: Category | string; // Populated = Category object, unpopulated = just the ID string
  images: string[];            // Array of image URLs
  stock: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
}

// ── Cart ──
export interface CartItem {
  product: Product;
  quantity: number;
  priceAtAdd: number; // SRS: snapshot price at time of adding
}

// ── User ──
export interface ShippingAddress {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin'; // Can only be one of these two strings
  address?: ShippingAddress; // ? means optional (might not exist yet)
}

// ── Order ── //
export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Payment Failed';

export interface OrderItem {
  product: string;  // Product ID (reference)
  name: string;     // SNAPSHOTTED at order time (SRS Section 22)
  image: string;    // SNAPSHOTTED
  price: number;    // SNAPSHOTTED — never changes even if product price changes later
  quantity: number;
}

export interface Order {
  _id: string;
  user: User | string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  total: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: OrderStatus;
  stripePaymentIntentId?: string;
  createdAt: string;
}
