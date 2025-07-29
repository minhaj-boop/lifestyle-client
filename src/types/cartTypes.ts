import { Product } from "./productTypes";
import { User } from "./userTypes";

export interface CartItems {
    id: number;
    cart?: Cart;
    product: Product;
    size: string;
    quantity: number;
    mrPrice: number;
    sellignPrice: number;
    userId: number;
}

export interface Cart {
    id: number;
    user: User;
    cartItems: CartItems[];
    totalSellingPrice: number;
    totalItem: number;
    totalMrPice: number;
    discount: number;
    couponCode: string | null;
}