import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SearchData {
  searchText: string;
  city:string
}

interface InitialState {
  searchData: SearchData;
}

const initialState: InitialState = {
  searchData: {
  searchText:'',
  city:''
  },
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setSearchData(state, action: PayloadAction<SearchData>) {
      state.searchData = action.payload;
    },
    clearSearchData(state) {
      state.searchData = initialState.searchData;
    },
  },
});

export const { setSearchData, clearSearchData } = searchDataSlice.actions;

export const selectSearchData = (state: RootState) => state.searchData.searchData;

export const searchDataReducer = searchDataSlice.reducer;
