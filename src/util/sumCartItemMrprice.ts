import { CartItems } from "../types/cartTypes";

export const sumCartItemMrprice = (cartItems:CartItems[])=>{
    return cartItems.reduce((acc, item)=>acc+item.mrPrice*item.quantity,0)
}