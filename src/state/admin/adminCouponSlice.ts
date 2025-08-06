import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coupon } from "../../types/couponTypes";
import { api } from "../../config/api";


const API_URL = "/coupon"

export const createCoupon = createAsyncThunk<
    Coupon,
    {coupon: any; jwt: string},
    {rejectValue: string}
>( "coupon/createCoupon", async ({coupon, jwt}, {rejectWithValue})=>{
    try {
        const response = await api.post(`${API_URL}/admin/create`, coupon, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        console.log("Coupon Created:", response.data);
        return response.data;
    } catch (error:any) {
        return rejectWithValue(error.response || "Failed to create coupon");
    }
});

