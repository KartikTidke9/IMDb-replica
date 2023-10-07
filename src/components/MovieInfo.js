import { Button, Chip, Divider, IconButton } from "@mui/material";
import style from "../css/MovieInfo.module.css";
import fallbackBackgroundImage from "../images/backgroundImage.jpg";
import StarIcon from "@mui/icons-material/Star";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CollectionsIcon from "@mui/icons-material/Collections";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

function MovieInfo({ details, clips, images, baseUrl, youtubeBaseUrl }) {
  //handling error in background image loading
  const handleFallbackBgImage = (e) => {
    e.currentTarget.src = fallbackBackgroundImage;
  };

  //mapping over genres array in details object
  const renderedGenres = details.genres?.map((genre) => {
    return (
      <Chip
        key={genre.id}
        sx={{ margin: "0.5rem 0.5rem 0.5rem 0" }}
        variant="outlined"
        color="secondary"
        label={genre.name}
      />
    );
  });

  //mapping over clips array to extract the required video object
  //eslint-disable-next-line
  const renderedMovieTrailer = clips.find((clip) => {
    if (clip.official && clip.site === "YouTube" && clip.type === "Trailer") {
      return clip;
    }
  });

  return (
    <div className={style.movie_details_container}>
      {/* background image */}
      <img
        src={baseUrl + details.belongs_to_collection?.backdrop_path}
        onError={handleFallbackBgImage}
        alt={details.original_title}
      />

      {/* main container  */}
      <div className={style.container}>
        {/* episodes */}
        <div className={style.episode_guide}>Episode guide</div>

        {/* movie media */}
        <div className={style.movie_media}>
          {/* title and rating part */}

          {/* title */}
          <div className={style.title_rating_part}>
            <div className={style.title}>
              <h1>
                <a
                  href={details.homepage}
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "whitesmoke" }}
                >
                  {details.title}
                </a>
              </h1>
              <div className={style.releasing_details}>
                <span>
                  Original title: {details.original_title} (
                  {details.original_language})
                </span>
                <span>
                  Release date: {details.release_date}
                  <Divider
                    orientation="vertical"
                    sx={{
                      height: "1rem",
                      bgcolor: "white",
                      margin: "0 0.5rem",
                    }}
                  />
                  Runtime: {(details.runtime / 60).toFixed(2)}hr
                </span>
              </div>
            </div>

            {/* rating */}
            <div className={style.rating}>
              <div>
                <h4>RATING</h4>
                <Button
                  variant="text"
                  sx={{
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  startIcon={
                    <StarIcon
                      sx={{ width: "2rem", height: "3rem" }}
                      color="primary"
                    />
                  }
                  color="secondary"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span>{details.vote_average?.toFixed(2)}/10</span>
                    <span>{(details.vote_count / 1000)?.toFixed(2)}k</span>
                  </div>
                </Button>
              </div>
              <div>
                <h4>POPULARITY</h4>
                <span>{details.popularity}</span>
              </div>
              <div>
                <h4>BUDGET</h4>
                <span>
                  $
                  {details.budget?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div>
                <h4>REVENUE</h4>
                <span>
                  $
                  {details.revenue?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* images and trailer part */}
          <div className={style.image_trailer_part}>
            <div className={style.poster}>
              <img
                src={baseUrl + details.poster_path}
                alt={details.original_title}
              />
              <IconButton sx={{ position: "absolute", left: 0, padding: 0 }}>
                <LibraryAddIcon
                  sx={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  color="primary"
                />
              </IconButton>
            </div>
            <div className={style.trailer}>
              <iframe
                src={youtubeBaseUrl + renderedMovieTrailer?.key}
                title={renderedMovieTrailer?.name}
              />
            </div>
            <div className={style.goto_links}>
              <AnchorLink href="#videos">
                <div>
                  <VideoLibraryIcon sx={{ width: "2rem", height: "3rem" }} />
                  {clips.length} VIDEOS
                </div>
              </AnchorLink>
              <AnchorLink href="#photos">
                <div>
                  <CollectionsIcon sx={{ width: "2rem", height: "3rem" }} />
                  {images.posters?.length} PHOTOS
                </div>
              </AnchorLink>
            </div>
          </div>
        </div>
        <div>
          {renderedGenres}
          <div>{details.overview || "No Overview"}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
