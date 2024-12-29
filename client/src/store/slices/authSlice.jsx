import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { storage } from "../../config/config";
import { ID } from "appwrite";




// Create an async thunk

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data, { rejectWithValue }) => {
        console.log(data.image);
           
        try {
            const bucketId = '67712ccb0018cd913bfb'
            const file = data.image
            const imageId = ID.unique();
            const promise = await storage.createFile(
                bucketId,
                 imageId,
                 file,
            )

            console.log(promise.$id, 'created')

            let userData = {
                email: data.email,
                password: data.password,
                name: data.name,
                imageURL: promise.$id
            }
        
            console.log(data);
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const user = await response.json();

            if (!response.ok) {
                throw new Error(user.message);
            }
            toast.success(user.message);
            console.log(user,'response user');
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const user = await response.json();

            if (!response.ok) {
                throw new Error(user.message);
            }
            localStorage.setItem('token',user.data.token);
            console.log(user.data.token,'token');
            toast.success('User logged in successfully');
            console.log(user,'response user');
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)





export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error:null

    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
        extraReducers: (builder)=>{
            builder.addCase(registerUser.pending,(state,action)=>{
                state.loading=true;
                state.error=null;
            });
            builder.addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;

            });
            builder.addCase(registerUser.rejected,(state,action)=>{
                state.error=action.payload;
                state.loading=false;
            });
            builder.addCase(loginUser.pending,(state,action)=>{
                state.loading=true;
                state.error=null;
            })
            builder.addCase(loginUser.fulfilled,(state,action)=>{
                state.user=action.payload;
                state.isAuthenticated = true
                state.loading=false;
               })
            builder.addCase(loginUser.rejected,(state,action)=>{
                state.error=action.payload;
                state.loading=false;
                state.isAuthenticated = false
            })
        }
    }
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;