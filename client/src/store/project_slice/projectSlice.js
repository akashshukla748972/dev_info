import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../services/axios";

export const createProject = createAsyncThunk(
  "project/createProject",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/projects/create", FormData);
      console.log(response);
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/projects/all-project", FormData);
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
        state.isError = action.payload;
      })
      .addCase(getAllProject.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = null;
        state.projects = action.payload.data;
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.projects = null;
      });
  },
});

export default projectSlice.reducer;
