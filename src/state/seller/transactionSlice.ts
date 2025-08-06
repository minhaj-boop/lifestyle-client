import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types/transactionTypes";
import { api } from "../../config/api";


interface TransactionSatate {
    transactions: Transaction[];
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionSatate ={
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
}

export const fetchTransactionBySeller = createAsyncThunk<
Transaction[],
string,
{rejectValue: string}
>(
    'transactions/fetchTransactionBySeller', async (jwt, {rejectWithValue})=>{
        try {
            const response = await api.get("/transaction/seller", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("Fetch seller transactions", response.data)
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response)
        }
    }
)

export const fetchAllTransactions = createAsyncThunk<
    Transaction[],
    void,
    {rejectValue: string}
>(
    "transactions/fetchAllTransactions", async (_,{rejectWithValue})=>{
        try {
            const response = await api.get<Transaction[]>("/transaction/get/all");
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response)
        }
    }
)

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        resetTransactionState: (state) => {
            state.transactions = [];
            state.transaction = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchTransactionBySeller
        builder.addCase(fetchTransactionBySeller.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTransactionBySeller.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        });
        builder.addCase(fetchTransactionBySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // fetchAllTransactions
        builder.addCase(fetchAllTransactions.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        });
        builder.addCase(fetchAllTransactions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;