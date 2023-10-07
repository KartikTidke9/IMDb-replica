import style from "../css/Card.module.css";
import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import fallbackImage from "../images/NoPreview.png";
import { useNavigate } from "react-router-dom";

//card variant
const cardVariant = {
  closed: {
    opacity: 0,
    y: "-15rem",
  },
  opened: {
    opacity: 1,
    y: 0,
  },
};

function MovieCard({ movie }) {
  //setting a fallback image
  const imageFallback = (e) => {
    e.currentTarget.src = fallbackImage;
  };

  const navigate = useNavigate();

  //handling click on movie card
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="closed"
      animate="opened"
      exit="closed"
      whileHover={{ scale: 1.05, cursor: "pointer" }}
    >
      <Card
        className={style.card}
        sx={{ boxShadow: "0 5px 2px 0 gray" }}
        onClick={handleClick}
      >
        <img
          loading="lazy"
          style={{ width: "15rem", height: "20rem" }}
          src={
            "https://www.themoviedb.org/t/p/w220_and_h330_face" +
            movie.poster_path
          }
          onError={imageFallback}
          alt={movie.original_title}
          title={movie.original_title}
        />
        <CardContent className={style.card_content}>
          <h4>{movie.title || "No Title"}</h4>
          <span>
            Rating: {movie.vote_average || 0}/{movie.vote_count || 0}
          </span>
          <span>Popularity: {movie.popularity || 0}/100</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MovieCard;
