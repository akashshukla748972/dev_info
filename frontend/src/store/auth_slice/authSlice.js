import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../services/Axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/auth/login", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/auth/check-auth");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/auth/logout");
      return response.data;
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isSubscribed: false,
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
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isError = null);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        (state.isLoading = true),
          (state.isError = null),
          (state.isAuthenticated = false);
        state.isSubscribed = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = null),
          (state.isAuthenticated = true);
        state.user = action.payload.data;
        state.isSubscribed = action.payload.data?.isSubscribed || false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.isSubscribed = false;
      })
      .addCase(logoutUser.pending, (state) => {
        (state.isLoading = true), (state.isError = null);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = null),
          (state.isAuthenticated = false);
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
