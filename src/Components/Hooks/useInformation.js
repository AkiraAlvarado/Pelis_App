import { useState, useEffect } from 'react';
import axios from 'axios';

const useInformation = ({url, apiKey}) => {
  const [genres, setGenres] = useState([])
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(url, {
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

  return genres;
}

export default useInformation;


