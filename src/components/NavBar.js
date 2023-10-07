import style from "../css/NavBar.module.css";
import { ReactComponent as ProviderLogo } from "../images/TMDB.svg";
import { ReactComponent as IMDbLogo } from "../images/IMDb_logo.svg";
import {
  Button,
  MenuItem,
  Select,
  Divider,
  Tooltip,
  IconButton,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store";
import { motion } from "framer-motion";
import { fetchSearchedMovies } from "../store";
import { useThunk } from "../hooks/use-thunk";
import MovieList from "./MovieList";

function NavBar() {
  const [selectiveSearchValue, setSelectiveSearchValue] = useState("multi");
  const [language, setLanguage] = useState("EN");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  //extracting user from state
  const { user } = useSelector((state) => state.users);
  //extracting movies from state
  const { searchedData } = useSelector((state) => state.movies);

  //calling the thunk fn for fetching movies based on search term
  const [doSearch, searchInProgress, errorInSearching] =
    useThunk(fetchSearchedMovies);

  //storing selectiveSearch
  const handleChangeSelectiveSearch = (e) => {
    setSelectiveSearchValue(e.target.value);
  };

  //storing language
  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  //storing search term
  const handleSearchMovies = (e) => {
    setSearchTerm(e.target.value);
  };

  //putting search preference in an object
  const search = {
    selectiveSearchValue,
    searchTerm,
  };

  //handling submit for the searchedmovies
  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(search);
  };

  //componentVariant
  const componentVariant = {
    offScreen: {
      y: "-10rem",
    },
    onScreen: {
      y: 0,
    },
  };
  
  //dynamically loading content
  let content;
  if (searchInProgress) {
    content = (
      <Skeleton
        variant="rectagular"
        width={"80rem"}
        height={"20rem"}
        animation="wave"
      />
    );
  } else if (errorInSearching) {
    content = <div>Error in searching movies...</div>;
  } else {
    content = (
      <div className={style.movie_list}>
        <MovieList movies={searchedData} />
      </div>
    );
  }

  return (
    <motion.div
      variants={componentVariant}
      initial="offScreen"
      animate="onScreen"
      exit="offScreen"
      className={style.navbar}
    >
      <div className={style.navbar_features}>
        {/* imdb logo */}
        <Link to="/">
          <div className={style.logo_container}>
            <IMDbLogo className={style.logo_image} />
          </div>
        </Link>

        {/* menu Button */}
        <Link to="/menu">
          <Button
            startIcon={<MenuIcon />}
            style={{ width: "6rem" }}
            variant="text"
            color="secondary"
            disableElevation
            disableTouchRipple
          >
            Menu
          </Button>
        </Link>

        {/* search field */}
        <form className={style.search_field} onSubmit={handleSubmit}>
          <TextField
            className={style.input}
            placeholder="Search IMDb"
            onChange={handleSearchMovies}
            InputProps={{
              sx: {
                backgroundColor: "white",
                height: "2rem",
                padding: "0 0.5rem",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" className={style.search_icon}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    variant="standard"
                    IconComponent={() => null}
                    className={style.mui_select}
                    color="secondary"
                    value={selectiveSearchValue}
                    onChange={handleChangeSelectiveSearch}
                    autoWidth
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                    }}
                  >
                    <MenuItem value="multi">All</MenuItem>
                    <MenuItem value="movie">Movie</MenuItem>
                    <MenuItem value="tv">TV</MenuItem>
                    <MenuItem value="person">Person</MenuItem>
                  </Select>
                  <Divider
                    orientation="vertical"
                    style={{ backgroundColor: "gray", height: "1.5rem" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </form>

        {/* api provider logo */}
        <div className={style.api_logo}>
          <Tooltip title="TMDB.com">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              <ProviderLogo className={style.api_logo_image} />
            </a>
          </Tooltip>
        </div>

        <Divider
          orientation="vertical"
          style={{ backgroundColor: "gray", height: "2rem" }}
        />

        {/* user related space */}
        {/* Bookmarks */}
        <Link to="/watchlist">
          <Button color="secondary" startIcon={<BookmarksIcon />}>
            Watchlist
          </Button>
        </Link>

        {/* login/logout Button */}
        {Object.keys(user).length === 0 ? (
          <Link to="/registration">
            <Button color="secondary">Sign In</Button>
          </Link>
        ) : (
          <Button color="secondary" onClick={() => dispatch(logoutUser())}>
            Log-Out
          </Button>
        )}

        {/* language selection */}
        <Select
          variant="standard"
          className={style.mui_select_language}
          value={language}
          onChange={handleChangeLanguage}
          autoWidth
          sx={{ color: "white" }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }}
        >
          <MenuItem value="EN">English</MenuItem>
          <MenuItem value="HI">Hindi</MenuItem>
        </Select>
      </div>

      {/* showing searched movies */}
      {searchTerm && (
        <div className={style.searched_movies}>
          <Divider orientation="horizontal" className={style.divider}>
            Searched Movies
          </Divider>
          {content}
        </div>
      )}
    </motion.div>
  );
}

export default NavBar;
