
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { Order, OrderItems, OrderState } from "../../types/orderTypes";
import { Address } from "../../types/userTypes";
import axios from "axios";

const initialState: OrderState = {
    orders: [],
    orderItems: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCanceled: false
}

const API_URL = "/order";

export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
    "order/fetchUserOrderHistory",
    async (jwt, {rejectWithValue})=>{
        try {
            const response = await api.get<Order[]>(`${API_URL}/history/user`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("Order History fetched ", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue(error.response || "Failed to fetch Order History");
        }
    }
);


export const fetchOrderById = createAsyncThunk<
    Order,
    {orderId: number; jwt: string}
>("order/fetchOrderById", async ({orderId, jwt}, {rejectWithValue})=>{
    try {
        const response = await api.get<Order>(`${API_URL}/get/by-id/${orderId}`, {
            headers:{Authorization:`Bearer ${jwt}`}
        });
        console.log("order fetched", response.data)
        return response.data;
    } catch (error:any) {
        console.log("Error", error.response)
        return rejectWithValue("Failed to fetch order!")
    }
});

export const createOrder = createAsyncThunk<any, {address:Address; jwt:string, paymentGateway:string}
>("order/createOrder", async ({address, jwt, paymentGateway}, {rejectWithValue})=>{
    try {
        const response = await api.post(`${API_URL}/create`, address, {
            headers: {Authorization: `Bearer ${jwt}`},
            params: {paymentMethod: paymentGateway}
        });
        console.log("Order Created", response.data)
        if(response.data.payment_link_url){
            window.location.href=response.data.payment_link_url
        }
        return response.data;
    } catch (error:any) {
        console.log("error", error.response);
        return rejectWithValue("Failed to create order!")
    }
});


export const fetchOrderItemById = createAsyncThunk<OrderItems, {orderItemId:number; jwt:string}
>("order/fetchOrderItemById", async ({orderItemId, jwt}, {rejectWithValue})=>{
    try {
        const response = await api.get(`${API_URL}/item/get/by-id/${orderItemId}`, {
            headers: {Authorization: `Bearer ${jwt}`},
        });
        console.log("Order item fetched", response.data)
        return response.data;
    } catch (error:any) {
        console.log("error", error.response);
        return rejectWithValue("Failed to fetch order!")
    }
});

export const paymentSuccess = createAsyncThunk<
    any,
    {paymentId: string; jwt: string; paymentLinkId:string},
    {rejectValue: string}
>('order/paymentSuccess', async ({paymentId, jwt, paymentLinkId}, {rejectWithValue})=>{
    try {
        const response = await api.get(`/payment/${paymentId}`, {
            headers: {Authorization: `Bearer ${jwt}`},
            params: {paymentLinkId}
        });
        console.log("payment success", response.data);
        return response.data;
    } catch (error:any) {
        console.log("error", error.response);
        if(error.response){
            return rejectWithValue(error.response);
        }
        return rejectWithValue('Failed to process payment!')
    }
});

export const cancelOrder = createAsyncThunk<Order, any>(
    'order/cancelOrder',
    async (orderid, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/cancel/{orderId}`, {}, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("Cancel Order", response.data)
            return response.data;
        } catch (error:any) {
            console.log("error", error.response)
            if(axios.isAxiosError(error)&& error.response) {
                return rejectWithValue(error.response.data)
            }
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrderHistory.pending, (state)=>{
            state.loading =true;
            state.error = null;
            state.orderCanceled=false;
        });
        builder.addCase(fetchUserOrderHistory.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchUserOrderHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // fetchOrderById
        builder.addCase(fetchOrderById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOrderById.fulfilled, (state, action:PayloadAction<Order>) => {
            state.loading = false;
            state.currentOrder = action.payload;
        });
        builder.addCase(fetchOrderById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // createOrder
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createOrder.fulfilled, (state, action:PayloadAction<any>) => {
            state.loading = false;
            state.paymentOrder = action.payload;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // fetchOrderItemById
        builder.addCase(fetchOrderItemById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOrderItemById.fulfilled, (state, action) => {
            state.loading = false;
            state.orderItems = action.payload;
        });
        builder.addCase(fetchOrderItemById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // paymentSuccess
        builder.addCase(paymentSuccess.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(paymentSuccess.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Payment Success:", action.payload) 
            // state.paymentOrder = action.payload;
        });
        builder.addCase(paymentSuccess.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // cancelOrder
        builder.addCase(cancelOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.orderCanceled = false;
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.map((order)=>
                order.id === action.payload.id ? action.payload : order
            );
            state.currentOrder = action.payload;
            state.orderCanceled = true;
        });
        builder.addCase(cancelOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            // state.orderCanceled = false;
        });
    }
})

export default orderSlice.reducer;


