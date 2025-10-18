import { CouponState } from './../../types/couponTypes';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../../types/couponTypes";
import { api } from "../../config/api";


const API_URL = "/coupon"

export const createCoupon = createAsyncThunk<
    Coupon,                        // Return type
    {request: any; jwt: string},   // Argument type
    {rejectValue: string}          // Rejection type
>( "coupon/createCoupon", async ({request, jwt}, {rejectWithValue})=>{
    try {
        const response = await api.post(`${API_URL}/admin/create`, request, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        console.log("Coupon Created:", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response || "Failed to create coupon");
    }
});

export const getAllCoupons = createAsyncThunk<
    Coupon[],
    {jwt: string},
    {rejectValue: string}
>(
    "coupon/getAllCoupons", async ({jwt}, {rejectWithValue}) =>{
        try {
            const response = await api.get(`${API_URL}/admin/get/all`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            });
            console.log("All coupons fetched successfully: ", response.data)
            return response.data;
        } catch (error:any) {
            const message = error.response?.data?.message || "Failed to fetch coupons.";
            return rejectWithValue(message);
        }
    }
)


const initialState: CouponState = {
    coupons: [],
    cart:  null,
    loading: false,
    error:  null,
    couponCreated: false,
    couponApplied: false
}


const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
      resetCouponStatus(state) {
        state.couponCreated = false;
        state.couponApplied = false;
        state.error = null;
      },
      applyCouponToCart(state, action: PayloadAction<{ cart: any }>) {
        state.cart = action.payload.cart;
        state.couponApplied = true;
      },
    },
    extraReducers: (builder) => {
      // Create Coupon
      builder
        .addCase(createCoupon.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.couponCreated = false;
        })
        .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
          state.loading = false;
          state.coupons.push(action.payload);
          state.couponCreated = true;
        })
        .addCase(createCoupon.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to create coupon.";
          state.couponCreated = false;
        });
  
      // Get All Coupons
      builder
        .addCase(getAllCoupons.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
          state.loading = false;
          state.coupons = action.payload;
        })
        .addCase(getAllCoupons.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch coupons.";
        });
    },
  });
  
  export const { resetCouponStatus, applyCouponToCart } = couponSlice.actions;
  export default couponSlice.reducer;