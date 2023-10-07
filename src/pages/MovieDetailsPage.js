import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  fetchActiveMovieDetails,
  fetchActiveMovieVideos,
  fetchActiveMovieImages,
  fetchActiveMovieReviews,
  fetchSimilarMovies,
  fetchActiveMovieCast,
} from "../store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { Alert, CircularProgress, Paper } from "@mui/material";
import style from "../css/MovieDetailsPage.module.css";
import MovieInfo from "../components/MovieInfo";
import { motion } from "framer-motion";
import MovieVideosList from "../components/MovieVideosList";
import MoviePhotosList from "../components/MoviePhotosList";
import MovieReviewsList from "../components/MovieReviews";
import SimilarMovies from "../components/SimilarMovies";
import MovieCast from "../components/MovieCast";

function MovieDetails() {
  //extracting movie id from use params and pass it to thunk function
  const { movie_id } = useParams();

  //using hook function to call active movie thunk
  const [doFetchMovieDetails, movieDetailsLoading, errorInMovieLoading] =
    useThunk(fetchActiveMovieDetails);

  //using hook function to call active movie videos thunk
  const [doFetchMovieVideos, movieVideosLoading, errorInVideosLoading] =
    useThunk(fetchActiveMovieVideos);

  //using hook function to call active movie images thunk
  const [doFetchMovieImages, movieImagesLoading, errorInImagesLoading] =
    useThunk(fetchActiveMovieImages);

  //using hook function to call active movie reviews thunk
  const [doFetchMovieReviews, movieReviewsLoading, errorInReviewsLoading] =
    useThunk(fetchActiveMovieReviews);

  //using hook function to call active movie images thunk
  const [doFetchMovieCast, movieCastLoading, errorInCastLoading] =
    useThunk(fetchActiveMovieCast);

  //using hook function to call similar movies as active movie thunk
  const [
    doFetchSimilarMovies,
    similarMoviesLoading,
    errorInSimilarMoviesLoading,
  ] = useThunk(fetchSimilarMovies);

  //extracting data for rendering the movie details page
  const { details, clips, images, reviews, similarMovies, cast } = useSelector(
    (state) => state.activeMovie
  );

  //calling use effect on page load and everytime thunks and movie id changes
  useEffect(() => {
    doFetchMovieDetails(movie_id);
    doFetchMovieVideos(movie_id);
    doFetchMovieImages(movie_id);
    doFetchMovieReviews(movie_id);
    doFetchSimilarMovies(movie_id);
    doFetchMovieCast(movie_id);
  }, [
    doFetchMovieCast,
    doFetchMovieDetails,
    doFetchMovieVideos,
    doFetchMovieImages,
    doFetchMovieReviews,
    doFetchSimilarMovies,
    movie_id,
  ]);

  //base urls
  const baseUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face";
  const youtubeBaseUrl = "https://youtube.com/embed/";

  //setting movie details based on request
  let movieDetails;
  if (
    movieDetailsLoading ||
    movieVideosLoading ||
    movieImagesLoading ||
    movieReviewsLoading ||
    similarMoviesLoading ||
    movieCastLoading
  ) {
    movieDetails = (
      <CircularProgress sx={{ top: "10rem", position: "relative" }} />
    );
  } else if (
    errorInMovieLoading ||
    errorInVideosLoading ||
    errorInImagesLoading ||
    errorInReviewsLoading ||
    errorInSimilarMoviesLoading ||
    errorInCastLoading
  ) {
    movieDetails = <Alert severity="error">Could not load movie details</Alert>;
  } else {
    movieDetails = (
      <>
        <MovieInfo
          details={details}
          clips={clips}
          images={images}
          baseUrl={baseUrl}
          youtubeBaseUrl={youtubeBaseUrl}
        />
        <MovieCast cast={cast} baseUrl={baseUrl} />
        <MovieVideosList clips={clips} youtubeBaseUrl={youtubeBaseUrl} />
        <MoviePhotosList images={images} baseUrl={baseUrl} />
        <motion.div>
          <Paper
            elevation={3}
            sx={{
              width: "80rem",
              bgcolor: "rgba(128, 128, 128, 0.245)",
              boxShadow: "0 5px 5px 0 #ffc107",
              color: "white",
              padding: "1rem",
            }}
            className={style.paper}
          >
            <div>
              <MovieReviewsList reviews={reviews} baseUrl={baseUrl} />
            </div>
            <div>
              <SimilarMovies movies={similarMovies} />
            </div>
          </Paper>
        </motion.div>
      </>
    );
  }

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

  return (
    <motion.div
      variants={pageVariant}
      initial="offScreen"
      animate="onScreen"
      exit="offScreen"
    >
      <NavBar />
      <div className={style.movie_details}>{movieDetails}</div>
    </motion.div>
  );
}

export default MovieDetails;
