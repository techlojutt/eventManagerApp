import {configureStore} from '@reduxjs/toolkit';
import  authSliceReducer  from './slices/authSlice';
import eventSliceReducer from './slices/eventSlice';

export const store = configureStore({
    reducer: {
        // Add reducers here
        authSlice: authSliceReducer,
        eventSlice: eventSliceReducer,  // Add event slice reducer here
    }
})