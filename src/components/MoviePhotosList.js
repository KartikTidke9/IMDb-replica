import {
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

function MoviePhotosList({ images, baseUrl }) {
  //function mapping over different images present in images object
  function renderedImages(imagesArr) {
    return imagesArr?.map((image) => {
      return (
        <ImageListItem key={image.file_path} sx={{ margin: "0.2rem" }}>
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
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "20rem" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.25 }}
      viewport={{ once: true, amount: 0.6 }}
      id="photos"
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
          <h1 style={{ color: "#ffc107" }}>Photos</h1>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={5}>
            {renderedImages(images.backdrops)}
            {renderedImages(images.posters)}
            {renderedImages(images.logos)}
          </ImageList>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
}

export default MoviePhotosList;
