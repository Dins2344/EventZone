import { configureStore } from "@reduxjs/toolkit";
import { userReducer} from "./reducers/userSlice";
import { eventReducer } from "./reducers/eventSlice";



export const store = configureStore({
    reducer:{
        userData:userReducer,
        eventData : eventReducer
    }
})



export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store