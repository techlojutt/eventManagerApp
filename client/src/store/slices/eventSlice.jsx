import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {storage} from "../../config/config"
import {ID} from "appwrite";
import {toast} from "react-toastify";




export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async () => {
        try {
            const response = await fetch('http://localhost:3000/events');
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
 );

  export const createEvent = createAsyncThunk(
    'event/createEvent',
    async (eventData,{rejectWithValue}) => {


        try {

            console.log(eventData);

            const bucketId = '67712ccb0018cd913bfb'
            const file = eventData.image
            const imageId = ID.unique();
            const promise = await storage.createFile(
                bucketId,
                 imageId,
                 file,
            )

             let event = {
                title: eventData.title,
                description: eventData.description,
                location: eventData.location,
                category: eventData.category,
                visibility: eventData.visibility,
                createdBy:"676d5effebe0eccac7b02c06",
                image: promise.$id 
             }

            const response = await fetch('http://localhost:3000/events/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message);
            }

            toast.success(data.message);

            return data;
        }


        catch(error){

            console.log(error);

         rejectWithValue(error.message);
         toast.error(error.message);
           


        }
    }

 );



 const eventSlice = createSlice({
    name: 'event',
    initialState: {
        events: [],
        loading: false,
        error: null
    },
    reducers: {
        // Add reducers here
    },
    extraReducers:(builder)=> {
        builder.addCase(fetchEvents.pending, (state,action) => {
            state.loading = true;
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(createEvent.pending, (state,action) => {
            state.loading = true;
        });
        builder.addCase(createEvent.fulfilled, (state,action) => {
            state.loading = false;
            state.events = action.payload;
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
 })

 export default eventSlice.reducer;