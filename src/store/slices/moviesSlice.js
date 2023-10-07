import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSearchedMovies,
  fetchMoviesList,
  fetchTvList,
  fetchTrendingList,
} from "../thunks/moviesThunk";

const moviesSlice = createSlice({
  name: "searchFilter",
  initialState: {
    query: "",
    searchedData: [],
    moviesList: [],
    tvList: [],
    trendingList: [],
  },
  extraReducers(builder) {
    //fetch searched movies
    builder.addCase(fetchSearchedMovies.fulfilled, (state, action) => {
      state.searchedData = action.payload.result;
      state.query = action.payload.query;
    });

    //fetch movie list based on the filter
    builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
      state.moviesList = action.payload;
    });

    //fetch tv list based on the filter
    builder.addCase(fetchTvList.fulfilled, (state, action) => {
      state.tvList = action.payload;
    });

    //fetch trending list based on time window(day/week)
    builder.addCase(fetchTrendingList.fulfilled, (state, action) => {
      state.trendingList = action.payload;
    });
  },
});

export const moviesReducer = moviesSlice.reducer;
