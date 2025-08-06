import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/homeCategoryTypes";
import { api } from "../../config/api";

const API_URL = "/home"

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
    'home/createHomeCategories',
    async (homeCategories, {rejectWithValue}) =>{
        try {
            const response = await api.post(`${API_URL}/category/create`,homeCategories);
            console.log("Created Category", response.data);
            return response.data;
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to create Home item";
            rejectWithValue(errorMessage);
        }
    }
)

interface HomeState {
    homePageData: HomeData | null;
    homeCategories: HomeCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    homePageData: null,
    homeCategories: [],
    loading: false,
    error: null
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        resetHomeState: (state) => {
            state.homePageData = null;
            state.homeCategories = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // fetchHomePageData
        // builder.addCase(fetchHomePageData.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.homePageData = action.payload;
        // });
        // builder.addCase(fetchHomePageData.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload as string;
        // });

        // createHomeCategories
        builder.addCase(createHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageData = action.payload;
        });
        builder.addCase(createHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetHomeState } = homeSlice.actions;
export default homeSlice.reducer;