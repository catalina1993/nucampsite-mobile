import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchCampsites = createAsyncThunk(
  "campsites/fetchCampsites",
  async () => {
    const response = await fetch(baseUrl + "campsites");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    return response.json();
  }
);

const campsitesSlice = createSlice({
  name: "campsites",
  initialState: { campsitesArray: [], isLoading: true, errMsg: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampsites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCampsites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campsitesArray = action.payload;
      })
      .addCase(fetchCampsites.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.error ? action.error.message : "Fetch failed";
      });
  },
});

export const campsitesReducer = campsitesSlice.reducer;

export default campsitesSlice.reducer;
