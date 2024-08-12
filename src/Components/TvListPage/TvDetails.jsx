import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";
import axios from "axios";
import ButtonFilter from "../Complements/ButtonFilter/ButtonFilter";
import ButtonEstandar from "../Complements/ButtonEstandar/ButtonEstandar";

const TvDetails = () => {
   const { id } = useParams(); // Obtener el ID de la serie desde la URL
   const apiKey = import.meta.env.VITE_API_KEY;
   const apiURL = import.meta.env.VITE_API_TV; // Cambiado a VITE_API_TV para series de TV
   const [detailMovie, setDetailMovie] = useState(null);
   const navigate = useNavigate(); // Inicializar useNavigate

   useEffect(() => {
      const fetchTv = async () => {
         try {
            const response = await axios.get(`${apiURL}/${id}`, {
               params: {
                  api_key: apiKey,
                  language: 'es-ES', // Cambia el idioma si es necesario
               },
            });
            console.log(response.data); // Aquí es donde deberías ver los datos recibidos
            setDetailMovie(response.data);
         } catch (error) {
            console.error('Error al obtener los detalles de la serie:', error);
            console.log(error.response);  // Verifica si hay alguna respuesta con información adicional
         }
      };
      fetchTv();
   }, [id, apiKey]);

   const handleFilterClick = (genre) => {
      navigate('/TvListPage', { state: { genreId: genre.id } }); // Redirige a MoviesPage pasando el género como estado
   }

   return (
      <div className="movieDetailContainer">
         {detailMovie ? (
            <div className="movieDetailContainer__main">
               <img src={`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`} alt={detailMovie.title} />
               <div className="movieDetailContainer__Information">
                  <h1>{detailMovie.name}</h1>
                  <p>{detailMovie.overview}</p>
                  <div className="movieDetailContainer__Details">
                     <p>Fecha de lanzamiento: {detailMovie.first_air_date}</p>
                     <p>Calificación: {detailMovie.vote_average}</p>
                  </div>
                  
                  {/* Renderizar los géneros */}
                  <div className="movieDetailGenre">
                     <h3 className="movieDetailGenre__title">Géneros:</h3>
                     <ul className="movieDetailGenre__genres">
                        {detailMovie && detailMovie.genres && (
                           detailMovie.genres.map((genre) => (
                              <ButtonFilter key={genre.id} text={genre.name} onClick={() => handleFilterClick(genre)} />
                           ))
                        )}
                     </ul>
                     <Link to="/TvListPage">
                        <ButtonEstandar className={"buttonBack"} icon={"fa-solid fa-magnifying-glass"} text={"Regresar"} />
                     </Link>
                  </div>

               </div>
            </div>
            
         ) : (
            <p>Cargando detalles de la serie...</p>
         )}
      </div>
   );
};

export default TvDetails;