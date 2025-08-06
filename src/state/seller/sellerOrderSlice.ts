import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderStatus } from "../../types/orderTypes";
import { api } from "../../config/api";

interface SellerOrderState {
    orders:Order[];
    loading: boolean;
    error: string | null;
}

const initialState: SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
}


const API_URL = "/seller/order"

export const fetchSellerOrders = createAsyncThunk<Order[],string>(
    'sellerOrders/fetchSellerOrders',
    async (jwt, {rejectWithValue}) => {
        try {
            const response =  await api.get(`${API_URL}/get/all`, {
                headers:{Authorization : `Bearer ${jwt}`},
            });
            console.log("Selled order fetched: ", response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response)
        }
    }
);

export const updateOrderStatus = createAsyncThunk<
Order, 
{
    jwt: string,
    orderId: number,
    orderStatus: OrderStatus
}
>(
    'sellerOrders/updateOrderStatus',
    async ({jwt, orderId, orderStatus}, {rejectWithValue})=>{
        try {
            const response = await api.patch(`${API_URL}/${orderId}/update/${orderStatus}`,
                null,{
                    headers: {Authorization:`Bearer ${jwt}`}
            });
            console.log("Order status updated", response.data)
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteOrder = createAsyncThunk<any, {jwt: string, orderId: number}>(
    'sellerOrders/deleteOrder',
    async({jwt, orderId}, {rejectWithValue})=>{
        try {
            const response = await api.delete(`${API_URL}/delete/${orderId}`, {
                headers: {Authorization: `Bearer ${jwt}`},
            })
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response)
        }
    }
)

const sellerOrderSlice = createSlice({
    name: "sellerOrders",
    initialState,
    reducers: {
        resetSellerOrderState: (state) => {
            state.orders = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchSellerOrders
        builder.addCase(fetchSellerOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchSellerOrders.fulfilled, (state, action:PayloadAction<Order[]>) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchSellerOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // updateOrderStatus
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
            state.loading = false;
            const updatedOrder = action.payload;
            const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
            if (index !== -1) {
                state.orders[index] = updatedOrder;
            }
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // deleteOrder
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            const deletedOrderId = action.meta.arg.orderId;
            state.orders = state.orders.filter((order) => order.id !== deletedOrderId);
        });
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetSellerOrderState } = sellerOrderSlice.actions;
export default sellerOrderSlice.reducer;