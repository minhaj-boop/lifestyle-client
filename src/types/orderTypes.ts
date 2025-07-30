import { Product } from "./productTypes";
import { Address, User } from "./userTypes";

export interface OrderState {
    orders: Order [];
    orderItems: OrderItems | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
    orderCanceled: boolean;
}

export interface Order {
    id: number;
    orderId: string;
    user: User;
    sellerId: number;
    orderItems: OrderItems[];
    orderDate: string;
    shippingAddress: Address;
    paymentDetails: any;
    totalMrPrice: number;
    totalSellingPrice?: number;
    discount?: number;
    orderStatus: OrderStatus;
    totalItems: number;
    deliveryDate: string;
}

export enum OrderStatus {
    PENDING='PENDING',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED'
}

export interface OrderItems {
    id: number;
    order: Order;
    product: Product;
    size: string;
    quantity: number;
    mrPrice: number;
    sellingPrice: number;
    userId: number;
}
