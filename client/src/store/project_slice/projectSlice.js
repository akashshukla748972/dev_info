import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../services/axios";

export const createProject = createAsyncThunk(
  "project/createProject",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = Axios.post("/projects/create", FormData);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      console.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  projects: null,
  isLoading: false,
  isError: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError(action.payload);
      });
  },
});

export default projectSlice.reducer;
