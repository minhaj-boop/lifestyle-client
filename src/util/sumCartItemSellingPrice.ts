import { CartItems } from "../types/cartTypes";

export const sumCartItemSellingPrice = (cartItems:CartItems[])=>{
    return cartItems.reduce((acc, item)=>acc+item.sellignPrice*item.quantity,0)
}