import style from "./css/index.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import { AnimatePresence, motion } from "framer-motion";
import NoMatchRoutePage from "./pages/NoMatchRoutePage";
import WatchListPage from "./pages/WatchListPage";
import AuthUser from "./components/AuthUser";
import MovieDetails from "./pages/MovieDetailsPage";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PersonDetailPage from "./pages/PersonDetailPage";
import PersonMovieCredits from "./components/PersonMovieCredits";
import PersonTvCredits from "./components/PersonTvCredits";
import MovieShows from "./components/MovieShows";
import TvShows from "./components/TvShows";

function App() {
  const location = useLocation();
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //useeffect for changing the state of move to top button visibility
  useEffect(() => {
    const handleMoveToTopBtnVisibility = () => {
      window.scrollY > 1000 ? setBtnVisibility(true) : setBtnVisibility(false);
    };

   window.addEventListener("scroll", handleMoveToTopBtnVisibility);

    return () => {
      window.removeEventListener("scroll", handleMoveToTopBtnVisibility);
    };
  }, []);

  const handleMoveToTopBtnClick = () => {
    window.scroll({ top: 0 });
  };

  return (
    <div className={style.App}>
      {/* move to top buttom */}
      {btnVisibility && (
        <motion.div
          layout
          className={style.move_to_top_btn}
          data-open={isOpen}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={handleMoveToTopBtnClick}
        >
          <IconButton sx={{ border: "1px solid white" }}>
            <ArrowUpwardIcon color="primary" />
          </IconButton>
          <motion.span>Move to top</motion.span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<LandingPage />}>
            <Route index element={<MovieShows />} />
            <Route path="/movies" element={<MovieShows />} />
            <Route path="/tv" element={<TvShows />} />
          </Route>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/registration/log-in" element={<LoginPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/watchlist"
            element={
              <AuthUser>
                <WatchListPage />
              </AuthUser>
            }
          />
          <Route path="/movie/:movie_id" element={<MovieDetails />} />
          <Route path="/person/:person_id" element={<PersonDetailPage />}>
            <Route index element={<PersonMovieCredits />} />
            <Route path="movies" element={<PersonMovieCredits />} />
            <Route path="tv-series" element={<PersonTvCredits />} />
          </Route>
          <Route path="/*" element={<NoMatchRoutePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
