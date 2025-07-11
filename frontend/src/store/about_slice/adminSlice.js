import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../services/Axios";

export const getLoggedAdminData = createAsyncThunk(
  "admin/getLoggedAdminData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/auth/check-auth");
      return response.data;
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "admin/updateProfileImage",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await Axios.put("admin/update-profile-photo", FormData);
      console.log(response);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.error(message);

      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProfileDetails = createAsyncThunk(
  "admin/updateProfileDetails",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await Axios.put("admin/update-profile-detail", FormData);
      console.log(response);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.error(message);

      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  admin: null,
  isLoading: false,
  isError: null,
};

const adminSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileImage.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.admin = action.payload.data;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(getLoggedAdminData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLoggedAdminData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.admin = action.payload.data;
      })
      .addCase(getLoggedAdminData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(updateProfileDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateProfileDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.admin = action.payload.data;
      })
      .addCase(updateProfileDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default adminSlice.reducer;
