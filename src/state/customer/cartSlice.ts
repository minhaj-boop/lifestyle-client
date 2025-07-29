import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItems } from "../../types/cartTypes";
import { api } from "../../config/api";
import { sumCartItemMrprice } from "../../util/sumCartItemMrprice";
import { sumCartItemSellingPrice } from "../../util/sumCartItemSellingPrice";
import { applyCoupon } from "./couponSlice";

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null
}

const API_URL = "/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
    "cart/fetchUserCart",
    async (jwt: string, {rejectWithValue})=>{
        try {
            const response = await api.get(`${API_URL}/find`, {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Cart fetched", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response)
            return rejectWithValue("Failed to fetch user cart")
        }
    }
);

interface AddItemRequest {
    productId: number | undefined;
    size: string;
    quantity: number;
}

export const addItemToCart = createAsyncThunk<CartItems, {jwt: string | null; request: AddItemRequest}>(
    "cart/addItemToCart", 
    async ({jwt, request}, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/item/add`, request,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("Cart");
            return response.data;
        } catch(error: any) {
            console.log("error", error.response)
            return rejectWithValue("Failed to add item to cart.")
        }
    }
);

export const deleteCartItem = createAsyncThunk<any, {jwt: string; cartItemId: number }>(
    "cart/deleteCartItem",
    async({jwt, cartItemId}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`${API_URL}/item/delete/${cartItemId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response || "Failed to delete cart Item")
        }
    }
)

export const updateCartItem = createAsyncThunk<any, {jwt: string | null; cartItemId: number; cartItem: any}>(
    "cart/updateCartItem",
    async ({jwt, cartItemId, cartItem}, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/item/update/${cartItemId}`, cartItem,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response || "Failed to update cart Item")
        }
    }
)

const cartSlice = createSlice ({
    name:"cart",
    initialState,
    reducers:{
        resetCartState: (state) => {
            state.cart=null;
            state.loading=false;
            state.error=null;
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchUserCart.pending, (state)=>{
            state.loading=true;
            state.error=null;
        }).addCase(
            fetchUserCart.fulfilled,
            (state, action: PayloadAction<Cart>) => {
                state.cart = action.payload;
                state.loading = false;
            }
        ).addCase(
            fetchUserCart.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
        ).addCase(
            addItemToCart.pending,
            (state) => {
                state.loading = false;
                state.error = null;
            }
        ).addCase(
            addItemToCart.fulfilled,
            (state, action: PayloadAction<CartItems>) => {
                if(state.cart){
                    state.cart.cartItems.push(action.payload);
                }
                state.loading = false;
            }
        ).addCase(
            addItemToCart.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
        ).addCase(
            deleteCartItem.pending,
            (state) => {
                state.loading = false;
                state.error =null;
            }
        ).addCase(
            deleteCartItem.fulfilled,
            (state, action) => {
                if(state.cart){
                    state.cart.cartItems = state.cart.cartItems.filter(
                        (item:CartItems)=>item.id !== action.meta.arg.cartItemId
                    );
                    const mrPrice = sumCartItemMrprice(state.cart?.cartItems || []);
                    const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || []);
                    state.cart.totalMrPice=mrPrice;
                    state.cart.totalSellingPrice=sellingPrice;
                }
                state.loading=false;
            }
        ).addCase(deleteCartItem.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string;
        }).addCase(updateCartItem.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateCartItem.fulfilled, (state, action)=>{
            if(state.cart) {
                const index = state.cart.cartItems.findIndex(
                    (item:CartItems)=> item.id === action.meta.arg.cartItemId
                );
                if(index !== -1) {
                    state.cart.cartItems[index]= {
                        ...state.cart.cartItems[index],
                        ...action.payload,
                    };
                }
                const mrPrice = sumCartItemMrprice(state.cart?.cartItems || [])
                const sellingPice = sumCartItemSellingPrice(state.cart?.cartItems || [])
                state.cart.totalSellingPrice=sellingPice;
                state.cart.totalMrPice=mrPrice;
            }
            state.loading=false;
        }).addCase(updateCartItem.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload as string;
        }).addCase(applyCoupon.fulfilled, (state, action)=>{
            state.loading = false;
            state.cart = action.payload;
        }); 
    },
});

export default cartSlice.reducer;
export const {resetCartState} = cartSlice.actions;

