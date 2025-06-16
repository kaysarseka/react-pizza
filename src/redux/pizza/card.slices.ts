import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "./card.thunk";
import { type PizzaT } from "./card.types";

interface PizzaState {
  pizza: PizzaT[];
  loading: boolean;
  error: string | null;
}

const initialState: PizzaState = {
  pizza: [],
  loading: false,
  error: null,
};

const PizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.pizza = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default PizzasSlice.reducer;
