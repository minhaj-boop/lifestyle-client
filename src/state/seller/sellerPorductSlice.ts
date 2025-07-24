import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Product } from "../../types/productTypes";

export const fetchSellerPorducts = createAsyncThunk<Product[], any>(
    "sellerProduct/fetchSellerPorducts",
    async(jwt, {rejectWithValue})=> {
        try{
            const response = await api.get(`seller/products/get/all`, {
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })

            const data = response.data;
            console.log("Fetched seller products:", data);
            return data;
        } catch (error) {
            console.error("Error fetching seller products:", error);
            throw error
        }
    }  
)

export const createProduct = createAsyncThunk<Product, {request: any, jwt: string | null}>(
    "sellerProduct/createProduct",
    async(args, {rejectWithValue}) => {
        const { request, jwt } = args;
        try {
            const response = await api.post(`seller/products/create`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Product created successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
        }
    }
)

interface sellerProductState{
    products: Product[];
    loading: boolean;
    error: string | null;

}

const initialState: sellerProductState = {
    products: [],
    loading: false,
    error: null
};

const sellerProductSlice = createSlice(
    {
        name: "sellerProduct",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(fetchSellerPorducts.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchSellerPorducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.products = action.payload;
                })
                .addCase(fetchSellerPorducts.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Failed to fetch products";
                })
                .addCase(createProduct.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createProduct.fulfilled, (state, action) => {
                    state.loading = false;
                    state.products.push(action.payload);
                })
                .addCase(createProduct.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Failed to create product";
                });
        }
    }
)

export default sellerProductSlice.reducer;