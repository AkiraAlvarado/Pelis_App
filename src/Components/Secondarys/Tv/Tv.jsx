import { Link } from "react-router-dom";

const Tv = ({ movie }) => {
  const src = import.meta.env.VITE_IMG_MOVIE;

  // Verifica si es una película o un programa de TV
  const title = movie.title || movie.name;

  return (
    <Link to={`/TvListPage/${movie.id}`}>
      <div className="movie-container">
        <img className="movie-image" src={`${src}${movie.poster_path}`} alt="Poster" />
        <p className="movie-title">{title}</p>
      </div>
    </Link>
  );
};

export default Tv;