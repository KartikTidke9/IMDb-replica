import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch person details
const fetchPersonDetails = createAsyncThunk(
  "people/details",
  async (person_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${person_id}`,
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

//fetch movie credits for a person
const fetchPersonMovieDetails = createAsyncThunk(
  "people/movie-credits",
  async (person_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${person_id}/movie_credits`,
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

//fetch tv credits for a person
const fetchPersonTvDetails = createAsyncThunk(
  "people/tv-credits",
  async (person_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${person_id}/tv_credits`,
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

//fetch photos for a person
const fetchPersonImages = createAsyncThunk(
  "people/images",
  async (person_id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${person_id}/images`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGQzMTQyYWZkN2EzMDlmMjcxNjFkMDhkMzNmMjZmMyIsInN1YiI6IjY0YjEwZGEzZDIzNmU2MDExY2E3ZDAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FDPG12-ssKAy6UI-sbgQfx7m5AAhmoIQ1AA1uZzfVps",
        },
      }
    );
    return response.data.profiles;
  }
);

export {
  fetchPersonDetails,
  fetchPersonMovieDetails,
  fetchPersonTvDetails,
  fetchPersonImages,
};
