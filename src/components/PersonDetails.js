import { Tooltip } from "@mui/material";
import style from "../css/PersonDetailsPage.module.css";
import { Outlet, NavLink } from "react-router-dom";

function PersonDetails({ person, baseUrl }) {
  //style for active link
  const navbarStyle = ({ isActive }) => {
    if (isActive) {
      return {
        backgroundColor: "gray",
        textDecoration: "none",
        color: "white",
        padding: "0.2rem 1rem",
        border: "2px solid #fec107",
        fontWeight: 600,
      };
    } else {
      return {
        textDecoration: "none",
        color: "white",
        padding: "1rem",
        fontWeight: 600,
      };
    }
  };

  return (
    <div className={style.person_container}>
      {/* name and image section */}
      <div className={style.image_container}>
        <Tooltip
          title={`https://www.imdb.com/name/${person.imdb_id}`}
          placement="top"
          arrow
          componentsProps={{
            tooltip: {
              sx: { bgcolor: "white", color: "black", fontWeight: 600 },
            },
            arrow: {
              sx: { color: "white" },
            },
          }}
        >
          <a
            href={`https://www.imdb.com/name/${person.imdb_id}`}
            className={style.anchor_tag}
            target="_blank"
            rel="noreferrer"
          >
            <h1>{person.name}</h1>
          </a>
        </Tooltip>
        <div className={style.person_image_container}>
          <img src={baseUrl + person.profile_path} alt={person.name} />
        </div>
      </div>

      {/* biography section */}
      <div className={style.person_biography}>
        <span>Department: {person.known_for_department}</span>
        <span>Birth: {new Date(person.birthday).toDateString()}</span>
        <span>Birth-place: {person.place_of_birth}</span>
        <span>
          Biography: <p>{person.biography}</p>
        </span>
      </div>

      {/* movie credits and tv credits section */}
      <div className={style.person_credits}>
        <div className={style.navigation}>
          <h1 className={style.anchor_tag}>Credits</h1>
          <span className={style.credits_navigation}>
            <NavLink style={navbarStyle} to="movies">
              Movies
            </NavLink>
            <NavLink style={navbarStyle} to="tv-series">
              Tv-series
            </NavLink>
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default PersonDetails;
