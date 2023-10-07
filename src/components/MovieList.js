import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return movies.map((movie) => <MovieCard movie={movie} key={movie.id}/>);
}

export default MovieList;
