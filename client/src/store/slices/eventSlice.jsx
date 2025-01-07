import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storage } from "../../config/config";
import { ID } from "appwrite";
import { toast } from "react-toastify";

// remove all the console.log

// Base Axios instance for consistent API calls
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const userRsvpRequest = createAsyncThunk(
    "event/rsvps",
    async (data, { rejectWithValue }) => {
        const eventId = data.eventId;
        const userId = data.userId;
        
      
        try {
            const response = await api.post(`/events/rsvp/${eventId}`, userId);
            toast.success(response.data.message);
            return eventId;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const updateEvent = createAsyncThunk(
    "event/updateEvent",
    async (eventData, { rejectWithValue }) => {
        const eventId = eventData.id;
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
            eventDate: eventData.date,
            image: promise.$id,
        };
        try {
            const response = await api.put(`/events/update/${eventId}`, updatedEvent);
            toast.success(response.data.message);
            return eventData;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return rejectWithValue(error.response?.data?.message || error.message);
        }   
    }
)

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/events/delete/${eventId}`);
            toast.success(response.message);
            return eventId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

// Fetch Events
export const fetchEvents = createAsyncThunk(
    "event/fetchEvents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/events");
            toast.success("Events fetched successfully");

            const eventsData = response.data.data;
            const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID;

            eventsData.map((event) => {
                const fileId = event.image;
                const result = storage.getFileView(bucketId, fileId);
                event.image = result;
            });

            return eventsData;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create Event
export const createEvent = createAsyncThunk(
    "event/createEvent",
    async (eventData, {getState, rejectWithValue }) => {
        try {
            const state = getState();
            const bucketId = import.meta.env.VITE_APPWRITE_BUCKETID;
            const file = eventData.image;
            const imageId = ID.unique();

            const promise = await storage.createFile(bucketId, imageId, file);

            const event = {
                title: eventData.title,
                description: eventData.description,
                location: eventData.location,
                category: eventData.category,
                visibility: eventData.visibility,
                createdBy: state.authSlice.user.data.id,
                eventDate: eventData.date,
                image: promise.$id,
            };

            const response = await api.post("/events/create", event);

            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
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
        updateEventById: (state, action) => {
            let updateEventById = state.events.find(event => event._id === action.payload);
            state.updateEvents = updateEventById;
        },
        resetUpdateEventId: (state, action) => {
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
                    image: action.payload.image,
                 }
                : event       
            );
        });
        builder.addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(userRsvpRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userRsvpRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.events = state.events.map((event) => 
                event._id === action.payload ? { ...event, rsvp: true } : event
            );
        });
        builder.addCase(userRsvpRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

// Export the custom reducers
export const { updateEventById, resetUpdateEventId } = eventSlice.actions;

export default eventSlice.reducer;
