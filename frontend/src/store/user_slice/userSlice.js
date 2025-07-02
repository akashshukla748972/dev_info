import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: null,
};

export const subscribe = createAsyncThunk(
  "/auth/subscribe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/users/subscribe");
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
      .addCase(logoutUser.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default userSlice.reducer;
