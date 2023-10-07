import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { fetchTrendingList } from "../store";
import {
  Alert,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MovieList from "./MovieList";
import { useEffect, useState, useCallback } from "react";
import style from "../css/LandingPage.module.css";

function TrendingList() {
  //state for storing filter value
  const [filterValue, setFilterValue] = useState("day");

  //using custom thunk to call fetch trending list thunk
  const [doFetchList, loadingList, errorInList] = useThunk(fetchTrendingList);

  //extracting trending list from movies state
  const { trendingList } = useSelector((state) => state.movies);

  //handling when trending show should start fetching data
  const handleTrendingShows = useCallback(
    (entries, observer) => {
      const [entry] = entries;

      //if not intersecting just return
      if (!entry.isIntersecting) return;

      //calling the fetch function on intersection
      doFetchList(filterValue);

      //unobserve after intersecting once
      observer.unobserve(entry.target);
    },
    [doFetchList, filterValue]
  );

  //observing list is inserecting the viewport
  useEffect(() => {
    //defining intersection observer API
    const trendingShowObserver = new IntersectionObserver(handleTrendingShows, {
      root: null,
      threshold: 0.15,
    });

    //setting the ID to be observed
    trendingShowObserver.observe(document.getElementById("trending_shows"));

    //unobserving the ID
    // return () => {
    //   trendingShowObserver.unobserve(document.getElementById("trending_shows"));
    // };
  }, [handleTrendingShows]);

  //updating jsx based request
  let trendingShows;
  if (loadingList) {
    trendingShows = (
      <Skeleton
        variant="rectangular"
        width="80rem"
        height="20rem"
        sx={{ bgcolor: "#fec10750" }}
      />
    );
  } else if (errorInList) {
    trendingShows = (
      <Alert severity="error">Could not load movie details</Alert>
    );
  } else {
    trendingShows = <MovieList movies={trendingList} />;
  }

  //handling filter value change
  const handleFilterValueChange = (_, updatedFilterValue) => {
    setFilterValue(updatedFilterValue);
  };

  return (
    <>
      <ToggleButtonGroup
        value={filterValue}
        exclusive
        onChange={handleFilterValueChange}
        color="primary"
        sx={{
          margin: "1rem 0 0.2rem 0.5rem",
          gap: "0.5rem",
        }}
      >
        <ToggleButton sx={{ color: "gray" }} value="day">
          Day
        </ToggleButton>
        <ToggleButton sx={{ color: "gray" }} value="week">
          Week
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={style.list} id="trending_shows">
        {trendingShows}
      </div>
    </>
  );
}

export default TrendingList;
