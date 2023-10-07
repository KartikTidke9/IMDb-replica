import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import fallbackImage from "../images/NoPreview.png";
import { useNavigate } from "react-router-dom";

function MovieCast({ cast, baseUrl }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: "20rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.25 }}
      viewport={{ once: true, amount: 0.6 }}
      id="videos"
    >
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
          <h1 style={{ color: "#ffc107" }}>Cast</h1>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={10}>
            {cast.cast?.map((person) => {
              return (
                <ImageListItem key={person.id} sx={{ margin: "0.1rem" }}>
                  <motion.img
                    src={baseUrl + person?.profile_path}
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                    alt={person.original_name}
                    loading="lazy"
                    style={{
                      width: "7rem",
                      height: "10rem",
                      backgroundColor: "gray",
                    }}
                    whileHover={{ scale: 1.05, cursor: "pointer", originX: 0 }}
                    onClick={() => navigate(`/person/${person.id}`)}
                  />
                  <ImageListItemBar
                    title={
                      person.character || person.original_name || "no name"
                    }
                    subtitle={
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{person.name || "no name"}</span>
                        <span>
                          {person.known_for_department || "no department"}
                        </span>
                      </div>
                    }
                    position="bottom"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
}

export default MovieCast;
