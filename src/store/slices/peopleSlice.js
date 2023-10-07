import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPersonDetails,
  fetchPersonMovieDetails,
  fetchPersonTvDetails,
  fetchPersonImages,
} from "../thunks/peopleThunk";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    person: {},
    movieCredits: {},
    tvCredits: {},
    images: [],
  },
  extraReducers(builder) {
    //fetching person details
    builder.addCase(fetchPersonDetails.fulfilled, (state, action) => {
      state.person = action.payload;
    });

    //fetching person movie details
    builder.addCase(fetchPersonMovieDetails.fulfilled, (state, action) => {
      state.movieCredits = action.payload;
    });

    //fetching person tv details
    builder.addCase(fetchPersonTvDetails.fulfilled, (state, action) => {
      state.tvCredits = action.payload;
    });

    //fetching person images
    builder.addCase(fetchPersonImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
  },
});

export const peopleReducer = peopleSlice.reducer;
