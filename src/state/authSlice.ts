import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/api";
import { User } from "../types/userTypes";

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
           const response = await api.post("/auth/sign-in",loginRequest) 
           console.log("Login otp response:", response.data);
           localStorage.setItem("jwt", response.data.token);
           return response.data.token;
       } catch (error) {
           console.error("Error sending otp:", error); 
       }
})

export const signup = createAsyncThunk<any,any>("/auth/signup",
    async (signupRequest, {rejectWithValue}) => {
       try {
           const response = await api.post("/auth/signup",signupRequest) 
           console.log("Login otp response:", response.data);
           localStorage.setItem("jwt", response.data.token);
           return response.data.token;
       } catch (error) {
           console.error("Error sending otp:", error); 
       }
})

export const fetchUserProfile = createAsyncThunk<any,any>("/auth/fetchUserProfile",
    async ({jwt},{rejectWithValue}) => {
       try {
           const response = await api.get("/users/profile", {
                headers:{
                    Authorization: `Bearer ${jwt}`,   
                }
           }) 
           console.log("User profile:", response.data);
           return response.data;
       } catch (error) {
           console.error("Error fetching user profile:", error); 
       }
})

export const logout = createAsyncThunk<any, any>("/auth/logout",
    async (navigate, {rejectWithValue}) => {
        try {
            localStorage.clear();
            console.log("Logout response:");
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
            return rejectWithValue(error);
        }
    }
)


interface AuthState {
    jwt: string | null;
    otpSent: boolean;
    isLoggedIn: boolean;
    user: User | null;
    loading:boolean;
}

const initialState:AuthState  = {
    jwt: null,
    otpSent: false,
    isLoggedIn: false,
    user: null,
    loading: false 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(sendLoginSignupOtp.pending, (state, action)=> {
            state.loading = true
        })

        builder.addCase(sendLoginSignupOtp.fulfilled, (state, action)=> {
            state.loading = false;
            state.otpSent=true;
        })

        builder.addCase(sendLoginSignupOtp.rejected, (state, action)=> {
            state.loading = false;
        })
        
        builder.addCase(signin.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.user=action.payload;
            state.isLoggedIn = true;
        })

        builder.addCase(logout.fulfilled, (state)=>{
            state.jwt = null;
            state.isLoggedIn=false;
            state.user=null;
        })
    }
})

export default authSlice.reducer