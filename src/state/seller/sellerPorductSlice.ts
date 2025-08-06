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

export const updateProduct = createAsyncThunk<
    Product,
    {productId:number, request: any; jwt:string | null},
    {rejectValue:string}
>(
    "sellerProduct/updateProduct",
    async({productId, request, jwt}, {rejectWithValue}) =>{
        try {
            const response = await api.put(`seller/products/update/${productId}`, request, {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Product updated successfully:", response.data);
            return response.data;
        } catch (error:any) {
            console.error("Error updating product:", error);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || "Failed to update product");
            }
            return rejectWithValue("Failed to update product");
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
                })
                .addCase(updateProduct.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateProduct.fulfilled, (state, action) => {
                    state.loading = false;
                    // Replace updated product in products array
                    const index = state.products.findIndex(p => p.id === action.payload.id);
                    if (index !== -1) {
                      state.products[index] = action.payload;
                    }
                })
                .addCase(updateProduct.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message || "Failed to update product";
                });
        }
    }
)

export default sellerProductSlice.reducer;