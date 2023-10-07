import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchMoviesList } from "../store";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import {
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import style from "../css/LandingPage.module.css";

function MovieShows() {
  //state for storing filter value
  const [filterValue, setFilterValue] = useState("now_playing");

  //using custom thunk to call fetch movie list thunk
  const [doFetchMovieList, loadingMovieList, errorInMovieList] =
    useThunk(fetchMoviesList);

  //calling the fetchMoviesList function on first render
  useEffect(() => {
    doFetchMovieList(filterValue);
  }, [doFetchMovieList, filterValue]);

  //extracting moviesList from movies state
  const { moviesList } = useSelector((state) => state.movies);

  //handling filter value change
  const handleFilterValueChange = (_, updatedFilterValue) => {
    setFilterValue(updatedFilterValue);
  };

  //updating jsx based request
  let movies;
  if (loadingMovieList) {
    movies = (
      <Skeleton
        variant="rectangular"
        width="80rem"
        height="20rem"
        sx={{ bgcolor: "#fec10750" }}
      />
    );
  } else if (errorInMovieList) {
    movies = <Alert severity="error">Could not load movie details</Alert>;
  } else {
    movies = <MovieList movies={moviesList} />;
  }

  return (
    <>
      <ToggleButtonGroup
        value={filterValue}
        exclusive
        onChange={handleFilterValueChange}
        color="primary"
        sx={{
          margin: "0 0.5rem",
          gap: "0.5rem",
        }}
      >
        <ToggleButton sx={{ color: "gray" }} value={"now_playing"}>
          Now playing
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"popular"}>
          Popular
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"top_rated"}>
          Top rated
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"upcoming"}>
          Upcoming
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={style.list}>{movies}</div>
    </>
  );
}

export default MovieShows;
