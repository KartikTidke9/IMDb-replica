import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchTvList } from "../store";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import {
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Skeleton,
} from "@mui/material";
import style from "../css/LandingPage.module.css";

function TvShows() {
  //state for storing filter value
  const [filterValue, setFilterValue] = useState("airing_today");

  //using custom thunk to call fetch movie list thunk
  const [doFetchTvList, loadingTvList, errorInTvList] = useThunk(fetchTvList);

  //calling the fetchMoviesList function on first render
  useEffect(() => {
    doFetchTvList(filterValue);
  }, [doFetchTvList, filterValue]);

  //extracting moviesList from movies state
  const { tvList } = useSelector((state) => state.movies);

  //handling filter value change
  const handleFilterValueChange = (_, updatedFilterValue) => {
    setFilterValue(updatedFilterValue);
  };

  //updating jsx based request
  let tv;
  if (loadingTvList) {
    tv = (
      <Skeleton
        variant="rectangular"
        width="80rem"
        height="20rem"
        sx={{ bgcolor: "#fec10750" }}
      />
    );
  } else if (errorInTvList) {
    tv = <Alert severity="error">Could not load movie details</Alert>;
  } else {
    tv = <MovieList movies={tvList} />;
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
        <ToggleButton sx={{ color: "gray" }} value={"airing_today"}>
          Airing today
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"on_the_air"}>
          On the air
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"popular"}>
          Popular
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value={"top_rated"}>
          Top rated
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={style.list}>{tv}</div>
    </>
  );
}

export default TvShows;
