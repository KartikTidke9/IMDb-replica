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

function MovieVideosList({ clips, youtubeBaseUrl }) {
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
          <h1 style={{ color: "#ffc107" }}>Videos</h1>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={3}>
            {clips?.map((video) => {
              return (
                <ImageListItem key={video.id}>
                  <iframe
                    src={youtubeBaseUrl + video.key}
                    title={video.name}
                    loading="lazy"
                    style={{ width: "25rem", height: "15rem" }}
                  />
                  <ImageListItemBar
                    title={video.name}
                    subtitle={<span>{video.type}</span>}
                    position="below"
                    style={{
                      width: "25rem",
                      marginBottom: "1rem",
                      color: "white",
                    }}
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

export default MovieVideosList;
