import Tv from "../../Secondarys/Tv/Tv";
const TvList = ({ movies }) => (
  <div className="sectionMovies">
    {movies.length > 0 ? (
         movies.map((movie) => (
         <Tv key={movie.id} movie={movie} />
         ))
      ) 
      : (
      <p>No se encontraron resultados.</p>
      )}
  </div>
);

export default TvList ;