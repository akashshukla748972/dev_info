import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../services/axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
