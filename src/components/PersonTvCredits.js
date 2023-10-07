import { useParams } from "react-router-dom";
import { useThunk } from "../hooks/use-thunk";
import { fetchPersonTvDetails } from "../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import PeopleList from "./PeopleList";
import { useState } from "react";

function PersonTvCredits() {
  //state for storing toggle button value
  const [actedAs, setActedAs] = useState("cast");

  const { person_id } = useParams();

  //using Thunk function to call fetch person movie credits
  const [doFetchTvCredits, loadingTvCredits, errorLoadingTvCredits] =
    useThunk(fetchPersonTvDetails);

  //calling the function once on component render
  useEffect(() => {
    doFetchTvCredits(person_id);
  }, [doFetchTvCredits, person_id]);

  const { tvCredits } = useSelector((state) => state.people);

  let credits;
  if (loadingTvCredits) {
    credits = <CircularProgress sx={{ left: "50%", position: "relative" }} />;
  } else if (errorLoadingTvCredits) {
    credits = <Alert severity="error">Could not load movie details</Alert>;
  } else {
    credits = (
      <PeopleList
        people={actedAs === "cast" ? tvCredits.cast : tvCredits.crew}
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

export default PersonTvCredits;
