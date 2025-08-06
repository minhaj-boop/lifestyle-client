import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Deal, DealsState } from "../../types/dealTypes";
import { api } from "../../config/api";

const API_URL = "/admin/deal/"

const initialState: DealsState = {
    deals:[],
    loading:false,
    error:null,
    dealCreated: false,
    dealUpdated: false,
}

export const getAllDeals = createAsyncThunk(
    "deals/getAllDeals",
    async(_,{rejectWithValue})=>{
        try {
            const response = await api.get(`${API_URL}/get/all`, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            })
            console.log("get all deal", response.data);
            return response.data;
        } catch (error:any) {
            console.log("error", error.response)
            return rejectWithValue(error?.response || "Failed to create deal")
        }
    }
)

export const createDeal = createAsyncThunk(
    "deals/createDeal",
    async(deal: any, {rejectWithValue}) => {
        try {
            const response = await api.post(`${API_URL}/create`, deal, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            console.log("created deal", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error.response);
            return rejectWithValue(error?.response || "Failed to create deal")
        }
    }
);

// export const updateDeal = createAsyncThunk<

// >(
//     "deals/updateDeal",
//     async({}, {rejectWithValue})=>{

//     }
// )

const dealSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {
        resetDealFlags(state) {
            state.dealCreated = false;
            state.dealUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDeal.fulfilled, (state, action) => {
                state.loading = false;
                state.deals.push(action.payload);
                state.dealCreated = true;
            })
            .addCase(createDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllDeals.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDeals.fulfilled, (state, action) => {
                state.loading = false;
                state.deals = action.payload;
            })
            .addCase(getAllDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetDealFlags } = dealSlice.actions;
export default dealSlice.reducer;