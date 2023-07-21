import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
  phoneNumber:number
  profileImage:string
  website:string
}

interface InitialState {
  user: User;
}

const initialState: InitialState = {
  user: {
    email: "",
    phoneNumber:0,
    _id: "",
    firstName: "",
    lastName: "",
    password: "",
    __v: 0,
    profileImage:'',
    website:''
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userData.user;

export const userReducer = userSlice.reducer;
