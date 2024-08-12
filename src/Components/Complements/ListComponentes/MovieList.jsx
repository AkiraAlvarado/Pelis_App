import Movie from "../../Secondarys/Movie/Movie";
const MovieList = ({ movies }) => (
  <div className="sectionMovies">
    {movies.length > 0 ? (
         movies.map((movie) => (
         <Movie key={movie.id} movie={movie} />
         ))
      ) 
      : (
      <p>No se encontraron resultados.</p>
      )}
  </div>
);

export default MovieList;