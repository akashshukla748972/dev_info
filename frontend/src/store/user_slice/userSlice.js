import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../services/Axios";

const initialState = {
  isLoading: false,
  isError: null,
};

export const subscribe = createAsyncThunk(
  "/auth/subscribe",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/users/subscribe", formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default userSlice.reducer;
