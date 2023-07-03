import { configureStore } from "@reduxjs/toolkit";
import { userReducer} from "./reducers/userSlice";



export const store = configureStore({
    reducer:{
        userData:userReducer,
    }
})



export type State = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store