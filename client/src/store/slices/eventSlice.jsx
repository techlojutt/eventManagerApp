import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storage } from "../../config/config";
import { ID } from "appwrite";
import { toast } from "react-toastify";

// Base Axios instance for consistent API calls
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const userRsvpRequest = createAsyncThunk(
    "event/rsvps",
    async (id, { rejectWithValue }) => {
          console.log(id); // Log the event ID being RSVPed to
        // Example user ID: 676d5eff
        const eventId = id.eventId;
        const userId = id.userId; // Example user ID: 676d5eff

        console.log(eventId,userId,"eventid,userid");
       

        try {
            const response = await api.post(`/events/rsvp/${eventId}`,{userId}); // Axios POST request
            console.log(response.data,'response data...'); // Log the RSVP response
            toast.success(response.data.message); // Success notification
            return eventId; // Return the event ID
        } catch (error) {
            console.error("Error RSVPing to event:", error);
            toast.error(error.response?.data?.message || error.message); // Error notification
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }

)


export const updateEvent = createAsyncThunk(
    "event/updateEvent",
     async (eventData, { rejectWithValue }) => {
        console.log(eventData,"eventData");
        const eventId = eventData.id; // Example event ID: 676d5eff
      
        // console.log(updatedEvent,"updatedEvent");
        const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID;
        const file = eventData.image;
        const imageId = ID.unique();
        const promise = await storage.createFile(bucketId, imageId, file);
        const updatedEvent = {
            title: eventData.title,
            description: eventData.description,
            location: eventData.location,
            category: eventData.category,
            visibility: eventData.visibility,
            image: promise.$id,
        };
        try {
            const response = await api.put(`/events/update/${eventId}`,{
                title: updatedEvent.title,
                description: updatedEvent.description,
                location: updatedEvent.location,
                category: updatedEvent.category,
                visibility: updatedEvent.visibility,
                image: updatedEvent.image,
            }); // Axios PUT request
            console.log(response.data,'response data...'); // Log the updated event
            toast.success(response.data.message); // Success notification
            return eventData; // Return the updated event ID
        } catch (error) {
            console.error("Error updating event:", error);
            toast.error(error.response?.data?.message || error.message); // Error notification
            return rejectWithValue(error.response?.data?.message || error.message);
        }   
     }
)

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (eventId, { rejectWithValue }) => {
        try {
         const response = await api.delete(`/events/delete/${eventId}`); // Axios DELETE request
            console.log(response.data,'response data...'); // Log the deleted event
            console.log(response.message,"response message...")                                                    // Log the success message
            toast.success(response.message)                                                    // Success notification
            return eventId; // Return the deleted event ID
            
        } catch (error) {
            console.error("Error deleting event:", error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

// Fetch Events
export const fetchEvents = createAsyncThunk(
    "event/fetchEvents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/events"); // Axios GET request
            toast.success("Events fetched successfully"); // Success notification
            console.log(response.data,'response data'); // Log the fetched events

            // Extract the events from the response

            const eventsData = response.data.data;
            const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID;

            eventsData.map( (event) => {
                // Fetch the image for each event from Appwrite Storage
                const fileId = event.image;
                const result = storage.getFileView(bucketId, fileId);
                // Replace the image ID with the image URL
                event.image = result;
            });
            console.log(response.data,'response data...'); // Log the fetched events

            return eventsData; // Axios automatically parses the JSON response
        } catch (error) {
            console.error("Error fetching events:", error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create Event
export const createEvent = createAsyncThunk(
    "event/createEvent",
    async (eventData, {getState,rejectWithValue }) => {
        try {
            console.log(eventData);

            const state = getState();
            console.log(state,"state");
            console.log(state.authSlice.user,"authSlice.data");
            console.log(state.authSlice.user.data.id,"auth.user.data.id");
            // console.log(state.auth.user.data.id,"auth.user.data.id");


            // Upload the image to Appwrite Storage
            const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID;
            const file = eventData.image;
            const imageId = ID.unique();

            const promise = await storage.createFile(bucketId, imageId, file);

            // Prepare the event object
            const event = {
                title: eventData.title,
                description: eventData.description,
                location: eventData.location,
                category: eventData.category,
                visibility: eventData.visibility,
                createdBy: state.authSlice.user.data.id, // Example user ID
                image: promise.$id, // Store the uploaded image ID
            };

            // Axios POST request to create the event
            const response = await api.post("/events/create", event);

            toast.success(response.data.message); // Success notification
            return response.data; // Return the API response
        } catch (error) {
            console.error("Error creating event:", error);

            // Extract error message from Axios response
            const errorMessage = error.response?.data?.message || error.message;

            // Display error notification and reject the action
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

// Event Slice
const eventSlice = createSlice({
    name: "event",
    initialState: {
        events: [],
        loading: false,
        error: null,
        updateEvents: null,
    },
    reducers: {
        // Add any custom reducers here
        updateEventById :(state,action)=>{
            console.log("updateId",action.payload);
            let updateEventById = state.events.find(event => event._id === action.payload);

            state.updateEvents = updateEventById;
           

        },
        resetUpdateEventId :(state,action)=>{
            state.updateEvents = null;
        }



    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvents.pending, (state) => {
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

        builder.addCase(createEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = [...state.events, action.payload]; // Append new event to the list
        });
        builder.addCase(createEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = state.events.filter((event) => event._id !== action.payload); // Remove the deleted event
        });
        builder.addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateEvent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateEvent.fulfilled, (state, action) => {
            console.log(action.payload,"action.payload");
            state.loading = false;
            state.events = state.events.map((event) => 
                event._id === action.payload.id ?
                 {
                    ...event,
                    title: action.payload.title,
                    description: action.payload.description,
                    location: action.payload.location,
                    category: action.payload.category,
                    visibility: action.payload.visibility,
                    image: action.payload.image, // Replace the image ID with the image URL
                 }
                : event       
            ); // Update the event
        });
        builder.addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },

});

// Export the custom reducers
export const { updateEventById, resetUpdateEventId } = eventSlice.actions;

export default eventSlice.reducer;
