import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/api";
import { Product } from "../../types/productTypes";

// const API_URL = "http://localhost:5454"
const API_URL = "/product";

export const fetchProductById = createAsyncThunk("product/fetchProductById", 
    async (productId:Number, {rejectWithValue}) => {
        try{
            const response = await api.get(`${API_URL}/get/by-id/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = response.data;
            console.log("Fetched product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching product:", error);
            rejectWithValue(error.message);   
        }
    }
)

export const searchProduct = createAsyncThunk("product/searchProduct", 
    async (query, {rejectWithValue}) => {
        try{
            const response = await api.post(`${API_URL}/search/by-query`, {
                params: {
                    query
                }
            });

            const data = response.data;
            console.log("Fetched product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching product:", error);
            rejectWithValue(error.message);   
        }
    }
)

export const fetchAllProducts = createAsyncThunk<any, any>("product/fetchAllProducts", 
    async (params, {rejectWithValue}) => {

        try{
            const response = await api.get(`${API_URL}/get/all`, {
               params: {
                    ...params,
                    pageNumber: params.pageNumber || 0,

               }
            });

            const data = response.data;
            console.log("All product data:", data);
            return data;
        } catch (error:any) {
            console.error("Error fetching product:", error);
            rejectWithValue(error.message);   
        }
    }
)

interface ProductState {
    product: Product | null;
    products: Product[];
    totalPages: number;
    loading: boolean;
    error: string | null | undefined;
    searchProducts: Product[];
}

const initialState: ProductState = {
    product: null,
    products: [],
    totalPages: 1,
    loading: false,
    error: null,
    searchProducts: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload ;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(searchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.searchProducts = action.payload;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.content || [];
                // state.totalPages = action.payload.totalPages || 1;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export default productSlice.reducer; 