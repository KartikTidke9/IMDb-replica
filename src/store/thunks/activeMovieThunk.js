import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch movie details
const fetchActiveMovieDetails = createAsyncThunk(
  "activeMovie/fetch",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );

    return response.data;
  }
);

//fetch movie videos
const fetchActiveMovieVideos = createAsyncThunk(
  "activeMovie/fetchVideos",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
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

//fetch movie images
const fetchActiveMovieImages = createAsyncThunk(
  "activeMovie/fetchImages",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/images`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );
    return response.data;
  }
);

//fetch movie reviews
const fetchActiveMovieReviews = createAsyncThunk(
  "activeMovie/fetchReviews",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews`,
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

//fetch similar movies
const fetchSimilarMovies = createAsyncThunk(
  "activeMovie/fetchSimilarMovies",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar`,
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

//fetch similar movies
const fetchActiveMovieCast = createAsyncThunk(
  "activeMovie/fetchCast",
  async (movie_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );
    return response.data;
  }
);

export {
  fetchActiveMovieDetails,
  fetchActiveMovieVideos,
  fetchActiveMovieImages,
  fetchActiveMovieReviews,
  fetchSimilarMovies,
  fetchActiveMovieCast
};
