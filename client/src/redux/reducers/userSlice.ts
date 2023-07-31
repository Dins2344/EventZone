import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RegisteredUserInterface } from "../../types/userInterface";



interface InitialState {
  user: RegisteredUserInterface;
}

const initialState: InitialState = {
  user: {
    email: "",
    phoneNumber:'',
    _id: "",
    firstName: "",
    lastName: "",
    password: "",
    __v: 0,
    profileImage:'',
    website: '',
    following: [''],
    likedEvents:['']
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<RegisteredUserInterface>) {
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
