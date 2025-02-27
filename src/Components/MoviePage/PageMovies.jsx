import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ButtonEstandar from "../Complements/ButtonEstandar/ButtonEstandar";
import FilterButtons from '../Complements/ListComponentes/FilterButtons';
import InputSearch from "../Complements/inputSearch/InputSearch";
import FilterMovies from '../Secondarys/FiltersMovies/FilterMovies';
import MovieList from '../Complements/ListComponentes/MovieList';
import useMovies from '../Hooks/usePetitionon';
import useInformation from '../Hooks/useInformation';

const PageMovie = () => {
  // Manejo de estados
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const location = useLocation();

  // Estados relacionados con géneros
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesURL, setMoviesURL] = useState(import.meta.env.VITE_API_URL_POPULAR);
  const [page, setPage] = useState(1);

  // URL y claves de la API
  const searchMoviesURL = import.meta.env.VITE_API_URL_SEARCH;
  const discoverMoviesURL = import.meta.env.VITE_MOVIE_DISCOVER;
  const discoverGenre = import.meta.env.VITE_MOVIE_GENRE;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Custom hook para obtener las películas
  const movies = useMovies(moviesURL, searchMoviesURL, discoverMoviesURL, apiKey, debouncedQuery, selectedGenre, page);
  const genres = useInformation({ url: discoverGenre, apiKey });

  const buttonData = [
    { text: "En emisión", url: import.meta.env.VITE_API_URL_PLAY },
    { text: "Popular", url: import.meta.env.VITE_API_URL_POPULAR },
    { text: "Mejor Valorados", url: import.meta.env.VITE_API_URL_VALORADAS },
    { text: "Proximamente", url: import.meta.env.VITE_API_URL_ESTRENO }
  ];


  // useEffect para manejar el debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // useEffect para obtener géneros al cargar la página

  // useEffect para manejar el location y actualizar el género seleccionado
  useEffect(() => {
    if (location.state && location.state.genreId) {
      setSelectedGenre(location.state.genreId); // Guardar el genreId en el estado
    }
  }, [location.state]);

  // Filtrar las películas basadas en el género seleccionado
  useEffect(() => {
    if (selectedGenre && query) {
      const filtered = movies.filter(movie => movie.genre_ids.includes(selectedGenre));
      setFilteredMovies(filtered.slice(0, 20)); // Tomar las primeras 20 películas
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedGenre, movies, query]);

  // Manejar el cambio de filtro
  const handleFilterClick = (url) => {
    setMoviesURL(url);
    setSelectedGenre(null); // Reinicia el género seleccionado al cambiar la URL
    setQuery(''); // Reinicia la consulta de búsqueda al cambiar la URL
    setDebouncedQuery(''); // Reinicia el debounce query
  };

  // Manejar el cambio de página
  const NextPage = () => {
    setPage(page + 1);
  }

  return (
    <>
      <div className="sectionFilter l-container">
        <div className="sectionFilter__buttons">
          <FilterButtons buttonData={buttonData} onFilterClick={handleFilterClick} moviesURL={moviesURL} />
        </div>
        <div className="sectionFilter__input">
          <InputSearch text={"Busca tu película favorita"} onChange={(e) => setQuery(e.target.value)} />
          <ButtonEstandar className={"buttonSearch"} icon={"fa-solid fa-magnifying-glass"} text={"Buscar"} onClick={() => setDebouncedQuery(query)} />
        </div>
      </div>
      <div className='sectionPrincipalMovies l-container'>
        <div className='sectionGenre'>
          <FilterMovies genres={genres} onGenreChange={setSelectedGenre} activeGenre={selectedGenre} />
        </div>
        <MovieList movies={filteredMovies} />
      </div>
      <button onClick={NextPage} disabled={!!query}>Siguiente</button>
    </>
  );
};

export default PageMovie;
