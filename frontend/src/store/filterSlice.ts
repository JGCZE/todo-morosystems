import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TFilter = "all" | "active" | "completed";

interface FilterState {
  value: TFilter;
}

const initialState: FilterState = { value: "all" };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TFilter>) {
      state.value = action.payload
    }
  },
});

export const { setFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;