import { IconButton } from "@mui/material";
import style from "../css/MenuPage.module.css";
import { ReactComponent as IMDbLogo } from "../images/IMDb_logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import MenuList from "../components/MenuList";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";
import StarsIcon from "@mui/icons-material/Stars";
import GroupIcon from "@mui/icons-material/Group";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();

  //list data passing to MenuList component
  const itemData = [
    {
      header: "Movies",
      header_icon: <LocalMoviesIcon />,
      listItem: [
        "Release Calender",
        "Top 250 Movies",
        "Most Popular Movies",
        "Browse Movies by Genre",
        "Top Box Office",
        "Showtimes & Tickets",
        "Movie News",
      ],
    },
    {
      header: "TV Shows",
      header_icon: <TvIcon />,
      listItem: [
        "What's on Tv & Streaming",
        "Top 250 TV Shows",
        "Most Popular TV Shows",
        "Browse TV Shows by Genre",
        "TV News",
      ],
    },
    {
      header: "Awards & Events",
      header_icon: <StarsIcon />,
      listItem: [
        "Oscars",
        "Emmys",
        "San Diego Comic-Con",
        "Outfest LA",
        "STARmeter Awards",
        "Awards Central",
        "Festival Central",
        "All Events",
      ],
    },
    {
      header: "Celebs",
      header_icon: <GroupIcon />,
      listItem: ["Born Today", "Most Popular Celebs", "Celebrity News"],
    },
    {
      header: "Watch",
      header_icon: <VideoLibraryIcon />,
      listItem: [
        "What to Watch",
        "Latest Trailers",
        "IMDb Originals",
        "IMDb Picks",
        "IMDb Podcasts",
      ],
    },
    {
      header: "Community",
      header_icon: <PublicIcon />,
      listItem: ["Help Center", "Contributor Zone", "Polls"],
    },
  ];

  //page variant
  const pageVariant = {
    closed: {
      y: "-100vh",
    },
    opened: {
      y: 0,
    },
  };

  return (
    <motion.div
      variants={pageVariant}
      initial="closed"
      animate="opened"
      exit="closed"
      className={style.page}
    >
      {/* imdb logo and close button*/}
      <div className={style.logo_container}>
        <div>
          <IMDbLogo className={style.logo_image} />
        </div>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "whitesmoke" }}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </div>
      <div className={style.list}>
        <MenuList items={itemData} />
      </div>
    </motion.div>
  );
}

export default MenuPage;
