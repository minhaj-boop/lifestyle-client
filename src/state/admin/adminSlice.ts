import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/homeCategoryTypes";
import { api } from "../../config/api";


const API_URL = "/home"

export const updateHomeCategory = createAsyncThunk<
    HomeCategory,
    {id: number, data: HomeData}
>(
    'homeCategory/updateHomeCategory',
    async ({id, data}, {rejectWithValue})=> {
        try {
            const response =  await api.patch(`${API_URL}/category/update/${id}`, data);
            console.log("Category updated: ", response);
            return response.data;
        } catch (error:any) {
            console.log("Error", error);
            if(error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('An error occured while updating the category.');
            }
        }
    }
);

export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
    'homeCategory/fetchHomeCategories',
    async(_,{rejectWithValue})=>{
        try {
            const response = await api.get(`${API_URL}/category/get`);
            console.log("Categories", response.data);
            return response.data;
        } catch(error:any) {
            console.log("error: ", error.response)
            return rejectWithValue(error.response || 'Failed to fetch categoried!')
        }
    }
)

interface HomeCategoryState {
    categories: HomeCategory[];
    loading: boolean;
    error: string | null;
    categoryUpdate: boolean;
}

const initialState: HomeCategoryState = {
    categories:[],
    loading: false,
    error: null,
    categoryUpdate: false,
}

const homeCategorySlice = createSlice({
    name: "homeCategory",
    initialState,
    reducers: {
        resetHomeCategoryState: (state) => {
            state.categories = [];
            state.loading = false;
            state.error = null;
            state.categoryUpdate = false;
        },
    },
    extraReducers: (builder) => {
        // fetchHomeCategories
        builder.addCase(fetchHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // updateHomeCategory
        builder.addCase(updateHomeCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.categoryUpdate = false;
        });
        builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryUpdate = true;
            const updatedCategory = action.payload;
            const index = state.categories.findIndex(cat => cat.id === updatedCategory.id);
            if (index !== -1) {
                state.categories[index] = updatedCategory;
            } else {
                state.categories.push(updatedCategory)
            }
        });
        builder.addCase(updateHomeCategory.rejected, (state, action) => {
            state.loading = false;
            state.categoryUpdate = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetHomeCategoryState } = homeCategorySlice.actions;
export default homeCategorySlice.reducer;