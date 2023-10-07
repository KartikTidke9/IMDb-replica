import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchPersonDetails, fetchPersonImages } from "../store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import PersonDetails from "../components/PersonDetails";
import {
  CircularProgress,
  Alert,
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ImageList,
  ImageListItem,
} from "@mui/material";
import style from "../css/PersonDetailsPage.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function PersonDetailPage() {
  //using custom hook to call person details thunk
  const [doFetchPerson, LoadingInFetchingPerson, errorInFetchingPerson] =
    useThunk(fetchPersonDetails);

  //using custom hook to call person images thunk
  const [
    doFetchPersonImages,
    LoadingInFetchingPersonImages,
    errorInFetchingPersonImages,
  ] = useThunk(fetchPersonImages);

  const { person_id } = useParams();

  //extracting person from state
  const { person, images } = useSelector((state) => state.people);

  const baseUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  //calling use effect on page load and everytime thunks and person id changes
  useEffect(() => {
    doFetchPerson(person_id);
    doFetchPersonImages(person_id);
  }, [doFetchPerson, doFetchPersonImages, person_id]);

  //page variant
  const pageVariant = {
    offScreen: {
      y: "15rem",
      opacity: 0,
    },
    onScreen: {
      y: 0,
      opacity: 1,
    },
  };

  //setting person details based on request
  let personDetails;
  if (LoadingInFetchingPerson || LoadingInFetchingPersonImages) {
    personDetails = (
      <CircularProgress sx={{ top: "10rem", position: "relative" }} />
    );
  } else if (errorInFetchingPerson || errorInFetchingPersonImages) {
    personDetails = (
      <Alert severity="error">Could not load movie details</Alert>
    );
  } else {
    personDetails = (
      <Paper
        elevation={3}
        sx={{
          width: "80rem",
          bgcolor: "rgba(128, 128, 128, 0.245)",
          boxShadow: "0 5px 5px 0 #ffc107",
          color: "white",
          padding: "1rem",
        }}
      >
        <PersonDetails person={person} baseUrl={baseUrl} />
      </Paper>
    );
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="offScreen"
      animate="onScreen"
      exit="offScreen"
    >
      <NavBar />
      <div className={style.person_details}>{personDetails}</div>
      <div className={style.person_images}>
        <Accordion
          sx={{
            width: "80rem",
            bgcolor: "rgba(128, 128, 128, 0.245)",
            boxShadow: "0 5px 5px 0 #ffc107",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                color="primary"
                sx={{ width: "4rem", height: "2rem" }}
              />
            }
            sx={{ borderLeft: "3px solid #ffc107" }}
          >
            <h1 style={{ color: "#ffc107" }}>Photos</h1>
          </AccordionSummary>
          <AccordionDetails>
            <ImageList cols={5}>
              {images?.map((image) => {
                return (
                  <ImageListItem
                    key={image.file_path}
                    sx={{ margin: "0.2rem" }}
                  >
                    <a
                      href={baseUrl + image.file_path}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={baseUrl + image.file_path}
                        alt={image}
                      />
                    </a>
                  </ImageListItem>
                );
              })}
            </ImageList>
          </AccordionDetails>
        </Accordion>
      </div>
    </motion.div>
  );
}

export default PersonDetailPage;
