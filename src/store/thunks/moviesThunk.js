import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch searched movies
const fetchSearchedMovies = createAsyncThunk(
  "movies/fetch",
  async ({ selectiveSearchValue, searchTerm }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${selectiveSearchValue}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
        params: {
          query: searchTerm,
        },
      }
    );

    return { result: response.data.results, query: searchTerm };
  }
);

//fetch filtered movies
const fetchMoviesList = createAsyncThunk(
  "movies/fetch-movie-list",
  async (filter) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${filter}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );

    return response.data.results;
  }
);

//fetch filtered tv shows
const fetchTvList = createAsyncThunk("movies/fetch-tv-list", async (filter) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${filter}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
      },
    }
  );

  return response.data.results;
});

//fetch trending tv, movie, people
const fetchTrendingList = createAsyncThunk(
  "movies/fetch-trending",
  async (time_window) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${time_window}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );

    return response.data.results;
  }
);

export { fetchSearchedMovies, fetchMoviesList, fetchTvList, fetchTrendingList };
