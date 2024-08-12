import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovies = (moviesURL, searchMoviesURL, discoverMoviesURL, apiKey, debouncedQuery, selectedGenre, page) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        // Si hay un texto en el input , entonces buscara peliculas basadas en ese input , aun así se filtrara según el genero gracias a MoviesPage
        if (debouncedQuery.length > 2) { 
          response = await axios.get(searchMoviesURL, {
            params: {
              api_key: apiKey,
              query: debouncedQuery,
              language: 'en-US',
              page: 1,
              include_adult: false,
            },
          });
        // Si no hay texto, pero hay un genero seleccionado, mandara peliculas de ese genero , 
        } else if (selectedGenre) {
          response = await axios.get(discoverMoviesURL, {
            params: {
              api_key: apiKey,
              language: 'es-ES',
              page: page,
              with_genres: selectedGenre,
            },
          });
          setMovies(response);
          console.log(response)
        // Si no hay texto, ni genero seleccionado, hara el llamado del URL seleccionado
        } else {
          response = await axios.get(moviesURL, {
            params: {
              api_key: apiKey,
              language: 'es-ES',
              page: page,
            },
          });
        }
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchMovies();
  }, [debouncedQuery, selectedGenre, moviesURL, searchMoviesURL, discoverMoviesURL, apiKey, page]);

  return movies;
};

export default useMovies;

