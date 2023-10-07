import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActiveMovieDetails,
  fetchActiveMovieVideos,
  fetchActiveMovieImages,
  fetchActiveMovieReviews,
  fetchSimilarMovies,
  fetchActiveMovieCast,
} from "../thunks/activeMovieThunk";

const activeMovieSlice = createSlice({
  name: "movie",
  initialState: {
    details: {},
    clips: [],
    images: {},
    reviews: [],
    similarMovies: [],
    cast: {},
  },
  extraReducers(builder) {
    //case for fetching particular movie with id
    builder.addCase(fetchActiveMovieDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });

    //case for fetching videos of a movie
    builder.addCase(fetchActiveMovieVideos.fulfilled, (state, action) => {
      state.clips = action.payload;
    });

    //case for fetching videos of a movie
    builder.addCase(fetchActiveMovieImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });

    //case for fetching reviews of a movie
    builder.addCase(fetchActiveMovieReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });

    //case for fetching similar movies
    builder.addCase(fetchSimilarMovies.fulfilled, (state, action) => {
      state.similarMovies = action.payload;
    });

    //case for fetching cast of a movie
    builder.addCase(fetchActiveMovieCast.fulfilled, (state, action) => {
      state.cast = action.payload;
    });
  },
});

export const activeMovieReducer = activeMovieSlice.reducer;
