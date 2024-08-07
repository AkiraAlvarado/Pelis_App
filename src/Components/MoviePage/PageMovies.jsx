import { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonEstandar from "../Complements/ButtonEstandar/ButtonEstandar";
import ButtonFilter from '../Complements/ButtonFilter/ButtonFilter';
import InputSearch from "../Complements/inputSearch/InputSearch";
import FilterMovies from '../Secondarys/FiltersMovies/FilterMovies';
import Movie from '../Secondarys/Movie/Movie';

const PageMovie = () => {
  // Sirven para mostrar peliculas y manejar el Buscador de Peliculas
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  //Sirven para filtrar el genero
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [moviesURL, setMoviesURL] = useState(import.meta.env.VITE_API_URL_ESTRENO);

  const searchMoviesURL = import.meta.env.VITE_API_URL_SEARCH;
  const apiKey = import.meta.env.VITE_API_KEY;

  const buttonData = [
    { text: "En emisión", url: import.meta.env.VITE_API_URL_PLAY },
    { text: "Popular", url: import.meta.env.VITE_API_URL_POPULAR },
    { text: "Mejor Valorados", url: import.meta.env.VITE_API_URL_VALORADAS },
    { text: "Proximamente", url: import.meta.env.VITE_API_URL_ESTRENO }
  ];

  // useEffect para el debounce , espera 0.5 segundos
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // useEffect para obtener películas populares y géneros al cargar la página, es decir al inicio
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(moviesURL, {
          params: {
            api_key: apiKey,
            language: 'es-ES',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas populares:', error);
      }
    };
    fetchPopularMovies();
  }, [moviesURL, apiKey]);

  // useEffect para obtener géneros al cargar la página
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
          params: {
            api_key: apiKey,
            language: 'es-ES',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    fetchGenres();
  }, [apiKey]);

  // useEffect para buscar películas cuando hay una consulta de búsqueda
  useEffect(() => {
    const searchMovies = async () => {
      if (debouncedQuery.length > 2) {
        try {
          const response = await axios.get(searchMoviesURL, {
            params: {
              api_key: apiKey,
              query: debouncedQuery,
              language: 'es-ES',
              page: 1,
              include_adult: false,
            },
          });
          setMovies(response.data.results);
        } catch (error) {
          console.error('Error al buscar películas:', error);
        }
      } else {
        if (selectedGenre) {
          fetchMoviesByGenre(selectedGenre);
        } else {
          const fetchPopularMovies = async () => {
            try {
              const response = await axios.get(moviesURL, {
                params: {
                  api_key: apiKey,
                  language: 'es-ES',
                  page: 1,
                },
              });
              setMovies(response.data.results);
            } catch (error) {
              console.error('Error al obtener películas populares:', error);
            }
          };
          fetchPopularMovies();
        }
      }
    };
    searchMovies();
  }, [debouncedQuery, selectedGenre, moviesURL, apiKey, searchMoviesURL]);

  // Función para obtener películas por género, obtiene el Id de genero al presionar el boton de seleecionar
  const fetchMoviesByGenre = async (genreId) => {
    if (!genreId) return;
    try {
      const response = await axios.get(moviesURL, {
        params: {
          api_key: apiKey,
          language: 'es-ES',
          page: 1,
          with_genres: genreId,
        },
      });
      setMovies(response.data.results);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener películas por género:', error);
    }
  };

  // Filtra las películas basadas en el género seleccionado cuando hay un input  
  useEffect(() => {
    if (selectedGenre) {
      const filtered = movies.filter(movie => movie.genre_ids.includes(selectedGenre));
      setFilteredMovies(filtered.slice(0, 20)); // Tomar las primeras 20 películas
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedGenre, movies]);

  const handleFilterClick = (url) => {
    setMoviesURL(url);
    setSelectedGenre(null); // Reinicia el género seleccionado al cambiar la URL
    setQuery(''); // Reinicia la consulta de búsqueda al cambiar la URL
    setDebouncedQuery(''); // Reinicia el debounce query
  };

  return (
    <>
      <div className="sectionFilter l-container">
        <div className="sectionFilter__buttons">
          {buttonData.map((button, index) => (
            <ButtonFilter key={index} text={button.text} onClick={() => handleFilterClick(button.url)} />
          ))}
        </div>
        <div className="sectionFilter__input">
          <InputSearch text={"Busca tu película favorita"} onChange={(e) => setQuery(e.target.value)} />
          <ButtonEstandar className={"buttonSearch"} icon={"fa-solid fa-magnifying-glass"} text={"Buscar"} onClick={() => setDebouncedQuery(query)} />
        </div>
      </div>

      <div className='sectionPrincipalMovies l-container'>
        <div className='sectionGenre'>
          <FilterMovies
            genres={genres}
            onGenreChange={setSelectedGenre}
          />
        </div>
        <div className="sectionMovies">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PageMovie;