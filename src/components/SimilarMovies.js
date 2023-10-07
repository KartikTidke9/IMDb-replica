import MovieList from "./MovieList";
import style from "../css/MovieDetailsPage.module.css";

function SimilarMovies({ movies }) {
  return (
    <>
      <h1 style={{ color: "#ffc107", margin: "0 0 1rem 0" }}>Similar movies</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflow: "auto",
          height: "100rem",
        }}
        className={style.similar_movies}
      >
        <MovieList movies={movies} />
      </div>
    </>
  );
}

export default SimilarMovies;
