import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp",
     async ({email}:{email:string}, {rejectWithValue}) => {
        try {
            const response = await api.post("/auth/send/login-signup-otp",{email})
            console.log("Login otp response:", response.data);
        } catch (error) {
            console.error("Error sending otp:", error); 
        }
})

export const signin = createAsyncThunk<any,any>("/auth/signin",
    async (loginRequest, {rejectWithValue}) => {
       try {
           const response = await api.post("/seller/login",loginRequest) 
           console.log("Login otp response:", response.data);
       } catch (error) {
           console.error("Error sending otp:", error); 
       }
})