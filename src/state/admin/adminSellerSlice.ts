import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Seller } from "../../types/sellerTypes";

const API_URL = "/admin";

export const updatSellerStatus = createAsyncThunk(
    "seller/updateSellerStatus",
    async(
        {jwt, sellerId, status}: { jwt: string; sellerId: number; status: string },
        {rejectWithValue}
    ) => {
        try {
            const response = await api.patch(
              `${API_URL}/update/seller/${sellerId}/status/${status}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );
            return response.data; // returns the updated Seller object
          } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Failed to update seller status');
          }
    }
)

export const fetchAllSellers = createAsyncThunk<Seller[], {jwt: string, status?: string}, {rejectValue: string}>(
    "seller/fetchAllSellers",
    async ({jwt, status}, {rejectWithValue})=>{
        try {
            const response = await api.get(`${API_URL}/get/all/sellers`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                params: status ? {status} : {},
            });
            console.log("All sellers fetched successfuly: ", response.data);
            return response.data;
        } catch (error:any) {
            const message = error.response?.data?.message || "Failed to fetch sellers.";
            return rejectWithValue(message);
        }
    }
)

interface SellerState {
    seller: any[];
    selectedSeller: any | null;
    profile: any | null;
    report: any | null;
    loading: boolean;
    error: any | null;
}

const initialState:SellerState ={
    seller: [],
    selectedSeller: null,
    profile: null,
    report: null,
    loading: false,
    error: null,
}

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
       
        builder.addCase(fetchAllSellers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllSellers.fulfilled, (state, action) => {
            state.loading = false;
            state.seller = action.payload;
        });
        builder.addCase(fetchAllSellers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default sellerSlice.reducer;