import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { logoutUser } from "./slices/usersSlice";
import { moviesReducer } from "./slices/moviesSlice";
import { activeMovieReducer } from "./slices/activeMovieSlice";
import { peopleReducer } from "./slices/peopleSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    movies: moviesReducer,
    activeMovie: activeMovieReducer,
    people: peopleReducer,
  },
});

export { store, logoutUser };

export * from "./thunks/userThunk";
export * from "./thunks/moviesThunk";
export * from "./thunks/activeMovieThunk";
export * from "./thunks/peopleThunk";
