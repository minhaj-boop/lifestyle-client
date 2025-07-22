import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/api";


export const sellerLogin = createAsyncThunk<any,any>("/auth/sellerLogin",
    async (loginRequest, {rejectWithValue}) => {
       try {
            const response = await api.post("/seller/login",loginRequest) 
            console.log("Login otp response:", response.data);
            const jwt  = response.data.token;
            localStorage.setItem('jwt', jwt);
       } catch (error) {
            console.error("Error sending otp:", error); 
       }
})