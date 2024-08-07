
const Movie = ({movie}) => {

   const src = import.meta.env.VITE_IMG_MOVIE;
   return(
      <>
      <div className="movie-container">
         <img className="movie-image" src={`${src}${movie.poster_path}`} alt="Movie Poster" />
         <p className="movie-title">{movie.title}</p>
      </div>
      </>
   )
}
export default Movie;