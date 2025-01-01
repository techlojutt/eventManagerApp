import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { storage } from "../../config/config";
import { ID } from "appwrite";
import axios from "axios";

// Create an Axios instance for API requests
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variables
    headers: {
        "Content-Type": "application/json", // Default header for JSON requests
    },
});

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID; // Bucket ID from environment variables
            const file = data.image; // Image file provided in the request
            const imageId = ID.unique(); // Generate a unique ID for the image

            // Upload the file to storage
            const promise = await storage.createFile(bucketId, imageId, file);
            console.log(promise.$id, "created"); // Log the uploaded file ID

            // Prepare user data including the uploaded image URL
            let userData = {
                email: data.email,
                password: data.password,
                name: data.name,
                imageURL: promise.$id,
            };

            console.log(userData); // Log the user data being sent
            const response = await api.post("/auth/register", userData); // API call to register user

            toast.success(response.data.message); // Display success message
            console.log(response.data, "response user"); // Log the response

            return response.data; // Return the response data
        } catch (error) {
            // Handle errors by rejecting with the error message
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data); // Log the login data being sent
            const response = await api.post("/auth/login", data); // API call to log in user

            const user = response.data; // Extract user data from response

            // Save the token to localStorage
            localStorage.setItem("token", user.data.token);
            console.log(user.data.token, "token"); // Log the token
            toast.success("User logged in successfully"); // Display success message
            console.log(user, "response user"); // Log the response

            return user; // Return the user data
        } catch (error) {
            // Handle errors by rejecting with the error message
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Slice for authentication state management
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false, // Track if user is authenticated
        user: null, // Store user data
        loading: false, // Loading state for async actions
        error: null, // Store any errors
    },
    reducers: {
        // Reducer for manual login
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
        },
        // Reducer for logging out
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        // Handle pending state for registerUser
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Handle fulfilled state for registerUser
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        // Handle rejected state for registerUser
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        // Handle pending state for loginUser
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Handle fulfilled state for loginUser
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        });
        // Handle rejected state for loginUser
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.isAuthenticated = false;
        });
    },
});

export const { login, logout } = authSlice.actions; // Export actions for manual login/logout
export default authSlice.reducer; // Export the reducer for the store
