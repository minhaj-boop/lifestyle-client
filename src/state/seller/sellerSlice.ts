import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Seller } from "../../types/sellerTypes";

const API_URL = "/seller"

export const fetchSellerProfile = createAsyncThunk("/seller/fetchSellerProfile",
     async (jwt: string, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/profile`,{
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

export const createSeller = createAsyncThunk<Seller, Seller, {rejectValue:string}>(
    "/seller/createSeller",
    async (sellerData, {rejectWithValue})=>{
        try {
            const response = await api.post(`${API_URL}/create`, sellerData);
            console.log("Seller created Successfully: ", response.data);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to create seller.";
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
       
        builder.addCase(fetchSellerProfile.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(fetchSellerProfile.fulfilled,(state, action)=>{
            state.loading = false;
            state.profile = action.payload;
        })
        builder.addCase(fetchSellerProfile.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(createSeller.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createSeller.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedSeller = action.payload;
        });
        builder.addCase(createSeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default sellerSlice.reducer;