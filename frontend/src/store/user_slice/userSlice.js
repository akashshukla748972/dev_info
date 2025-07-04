import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../services/Axios";

const initialState = {
  isLoading: false,
  isError: null,
  isOpenForm: false,
};

export const subscribe = createAsyncThunk(
  "/user/subscribe",
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

export const registerClient = createAsyncThunk(
  "/user/registerClient",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/users/register", formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "/user/verifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/users/verify-otp", formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginClient = createAsyncThunk(
  "/user/loginClient",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/users/login", formData);
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
  reducers: {
    showForm: (state) => {
      state.isOpenForm = true;
    },
    hideForm: (state) => {
      state.isOpenForm = false;
    },
  },
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
      })
      .addCase(registerClient.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(registerClient.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(registerClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(loginClient.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { showForm, hideForm } = userSlice.actions;
export default userSlice.reducer;
