import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RegisteredEventInterface } from "../../types/organizerInterface";



const initialState={
    eventDetails:{}
}

const eventSlice = createSlice({
  name: "eventData",
  initialState,
  reducers: {
    setEvent(
      state,
      action: PayloadAction<{ eventDetails: RegisteredEventInterface }>
    ) {
      state.eventDetails = { eventDetails: action.payload };
    },
    clearEvent(state) {
      state.eventDetails = {};
    },
  },
});

export const {setEvent,clearEvent}=eventSlice.actions

export const selectEvent=(state:RootState)=>state.eventData.eventDetails

export const eventReducer =eventSlice.reducer;