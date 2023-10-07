import { useParams } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { fetchPersonMovieDetails } from "../store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "@mui/material";
import PeopleList from "./PeopleList";

function PersonMovieCredits() {
  //state for storing toggle button value
  const [actedAs, setActedAs] = useState("cast");

  const { person_id } = useParams();

  //using Thunk function to call fetch person movie credits
  const [doFetchMovieCredits, loadingMovieCredits, errorLoadingMovieCredits] =
    useThunk(fetchPersonMovieDetails);

  //calling the function once on component render
  useEffect(() => {
    doFetchMovieCredits(person_id);
  }, [doFetchMovieCredits, person_id]);

  const { movieCredits } = useSelector((state) => state.people);

  let credits;
  if (loadingMovieCredits) {
    credits = <CircularProgress sx={{ left: "50%", position: "relative" }} />;
  } else if (errorLoadingMovieCredits) {
    credits = <Alert severity="error">Could not load movie details</Alert>;
  } else {
    credits = (
      <PeopleList
        people={actedAs === "cast" ? movieCredits.cast : movieCredits.crew}
      />
    );
  }

  //changing acted as state if person is acted as crew or cast
  const handleChangeActedAs = (_, updatedValue) => {
    setActedAs(updatedValue);
  };

  return (
    <>
      <div>
        <ToggleButtonGroup
          value={actedAs}
          onChange={handleChangeActedAs}
          color="primary"
          exclusive
          fullWidth
          sx={{ marginTop: "1rem" }}
        >
          <ToggleButton
            value={"cast"}
            sx={{
              fontWeight: 600,
              padding: "0.2rem 1rem",
              letterSpacing: "0.3rem",
            }}
          >
            Cast
          </ToggleButton>
          <Divider style={{ backgroundColor: "black" }} />
          <ToggleButton
            value={"crew"}
            sx={{
              fontWeight: 600,
              padding: "0.2rem 1rem",
              letterSpacing: "0.3rem",
            }}
          >
            Crew
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div style={{ margin: "1rem" }}>{credits}</div>
    </>
  );
}

export default PersonMovieCredits;
