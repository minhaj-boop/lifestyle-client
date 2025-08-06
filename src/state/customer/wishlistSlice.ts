import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/api";


const initialState: WishlistState = {
    wishlist: null,
    loading: false,
    error: null
}

const API_URL = "/wishlist"

export const getWishlistByUserId = createAsyncThunk(
    "wishlist/getWishlistByUserId",
    async (_, {rejectWithValue})=>{
        try {
            const response = await api.get(`${API_URL}/get`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                }
            });
            console.log("wishlist fethed", response.data)
            return response.data;
        } catch (error: any) {
            console.log("error", error)
            return rejectWithValue(error.response?.data.message || "Failed to fetch wishlist.");
        }
    }
)

export const addProductToWishlist = createAsyncThunk(
    "wishlist/addProductToWishlist",
    async (
        {productId}: {productId: number},
        {rejectWithValue}
    )=>{
        try {
            const response = await api.post(
                `${API_URL}/add-product/${productId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`
                    },
                }
            );
            console.log("Added product: ", response.data)
            return response.data;
        } catch (error:any) {
            rejectWithValue(error.response || "Failed to add product to wishlist");
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        resetWishlistState: (state) =>{
            state.wishlist = null;
            state.loading = false;
            state.error = null
        },
    },
    extraReducers: (builder) => {
        // getWishlistByUserId
        builder.addCase(getWishlistByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getWishlistByUserId.fulfilled, (state, action:PayloadAction<Wishlist>) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(getWishlistByUserId.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // addProductToWishlist
        builder.addCase(addProductToWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addProductToWishlist.fulfilled, (state, action:PayloadAction<Wishlist>) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(addProductToWishlist.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {resetWishlistState} = wishlistSlice.actions;
export default wishlistSlice.reducer;