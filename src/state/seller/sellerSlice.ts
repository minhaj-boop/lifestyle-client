import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

export const fetchSellerProfile = createAsyncThunk("/seller/fetchSellerProfile",
     async (jwt: string, {rejectWithValue}) => {
        try {
            const response = await api.get("/seller/profile",{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            })
            console.log("Seller profile fetched successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching seller profile:", error); 
        }
})

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
        builder.addCase(fetchSellerProfile.pending,(state)=>{
            state.loading = true;
        }).addCase(fetchSellerProfile.fulfilled,(state, action)=>{
            state.loading = false;
            state.profile = action.payload;
        }).addCase(fetchSellerProfile.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default sellerSlice.reducer;