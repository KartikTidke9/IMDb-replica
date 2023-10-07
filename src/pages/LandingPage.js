import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import style from "../css/LandingPage.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import TrendingList from "../components/TrendingList";

function LandingPage() {
  //extracting user from redux store
  const { user } = useSelector((state) => state.users);

  //state for handling snackbar after login
  const [open, setOpen] = useState(true);

  //handling snackbar close
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //setting snackbar alert dynamically based on user logged in
  let content = null;
  if (Object.keys(user).length !== 0) {
    content = <Alert severity="success">Welcome, {user.user.firstname}</Alert>;
  } else {
    content = <Alert severity="error">Error loging in</Alert>;
  }

  //styling active navlink
  const navLinkStyles = ({ isActive }) => {
    if (isActive) {
      return {
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: 600,
        padding: "0.2rem 1.2rem",
        borderRadius: "9999px",
        backgroundColor: "#fec107",
        color: "white",
        border: "1px solid white",
      };
    } else {
      return {
        textDecoration: "none",
        fontSize: "1.2rem",
        fontWeight: 600,
        padding: "0.2rem 1.2rem",
        borderRadius: "9999px",
        color: "white",
      };
    }
  };

  //movie tv shows
  const outletVariant = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <div>
      <NavBar />
      <div className={style.landing_page}>
        <div className={style.movie_tv_shows}>
          <div className={style.heading}>
            <h1>Movies/Tv shows</h1>
            <div className={style.links}>
              <NavLink style={navLinkStyles} to="/movies">
                Movies
              </NavLink>
              <NavLink style={navLinkStyles} to="/tv">
                Tv
              </NavLink>
            </div>
          </div>
          <motion.div
            variants={outletVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Outlet />
          </motion.div>
        </div>
        <div className={style.trending_shows}>
          <div className={style.heading}>
            <h1>Trending</h1>
          </div>
          <TrendingList />
        </div>
      </div>

      {/* snackbar if someone succesfully logged in */}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {content}
      </Snackbar>
    </div>
  );
}

export default LandingPage;
