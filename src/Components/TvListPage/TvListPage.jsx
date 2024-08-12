import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import ButtonEstandar from "../Complements/ButtonEstandar/ButtonEstandar";
import FilterButtons from '../Complements/ListComponentes/FilterButtons';
import InputSearch from "../Complements/inputSearch/InputSearch";
import FilterMovies from '../Secondarys/FiltersMovies/FilterMovies';
import TvList from '../Complements/ListComponentes/TvList';
import useMovies from '../Hooks/usePetitionon';
import useInformation from '../Hooks/useInformation';

const TvListPage = () => {
  // Manejo de estados
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const location = useLocation();

  // Estados relacionados con géneros
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [tvURL, setMoviesURL] = useState(import.meta.env.VITE_TV_AIRING_TODAY);
  const [page, setPage] = useState(1);

  // URL y claves de la API
  const searchTVURL = import.meta.env.VITE_API_URL_SEARCH;
  const discoverTVURL = import.meta.env.VITE_TV_VER;
  const discoverGenre = import.meta.env.VITE_TV_GENRES;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Custom hook para obtener las películas
  const tv = useMovies(tvURL, searchTVURL, discoverTVURL, apiKey, debouncedQuery, selectedGenre, page);
  const genres = useInformation({ url: discoverGenre, apiKey });

  const buttonData = [
   { text: "Emisión Hoy", url: import.meta.env.  VITE_TV_AIR_TODAY },
   { text: "Al aire", url: import.meta.env.  VITE_TV_ON_AIR },
   { text: "Populares", url: import.meta.env.VITE_TV_POPULAR },
   { text: "Rankeados", url: import.meta.env. VITE_TV_RANKED }
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

  // useEffect para manejar el location y actualizar el género seleccionado
  useEffect(() => {
    if (location.state && location.state.genreId) {
      setSelectedGenre(location.state.genreId); // Guardar el genreId en el estado
    }
  }, [location.state]);

  // Filtrar las películas basadas en el género seleccionado
  useEffect(() => {
    if (selectedGenre && query) {
      const filtered = tv.filter(movie => movie.genre_ids.includes(selectedGenre));
      setFilteredMovies(filtered.slice(0, 20)); // Tomar las primeras 20 películas
    } else {
      setFilteredMovies(tv);
    }
  }, [selectedGenre,tv, query]);

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
          <FilterButtons buttonData={buttonData} onFilterClick={handleFilterClick} moviesURL={tvURL} />
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
        <TvList movies={filteredMovies} />
      </div>
      <button onClick={NextPage} disabled={!!query}>Siguiente</button>
    </>
  );
};

export default TvListPage;
