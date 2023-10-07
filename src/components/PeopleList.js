import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import fallbackImage from "../images/NoPreview.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PeopleList({ people }) {
  const baseUrl = "https://www.themoviedb.org/t/p/w220_and_h330_face";

  const navigate = useNavigate();

  return (
    <ImageList
      cols={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {people?.map((person) => {
        return (
          <ImageListItem
            key={person.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "12rem",
              boxShadow: "0 1px 3px white",
              margin: "0.2rem",
            }}
            onClick={() => navigate(`/movie/${person.id}`)}
          >
            <motion.img
              whileHover={{
                cursor: "pointer",
                userSelect: "none",
                width: "100%",
                height: "100%",
              }}
              style={{
                width: "12rem",
                height: "15rem",
                objectFit: "contain",
                color: "white",
              }}
              src={baseUrl + person.poster_path}
              onError={(e) => (e.currentTarget.src = fallbackImage)}
              alt={person.original_title}
            />
            <ImageListItemBar
              title={person.character || "no title"}
              subtitle={person.title || person.original_title || "no subtitle"}
              position="below"
              sx={{ width: "12rem" }}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default PeopleList;
