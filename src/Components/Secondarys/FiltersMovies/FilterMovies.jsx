import { useState } from "react";
import ButtonEstandar from "../../Complements/ButtonEstandar/ButtonEstandar";
const FilterMovies = ({ genres, onGenreChange }) => {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <ButtonEstandar className={"buttonGenre-modal"} icon={"fa-solid fa-sort-down"} text={"Genero de Peliculas"} onClick={handleModal}/>
      <div className={`filter-main ${modal ? 'list-show' : ''}`}>
        <p className="filterGenre-title">Filtre sus generos favoritos</p>
        <ul className="filterGenre-container">
          <li
            className="filter-genre"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onGenreChange(null);
              handleModal();
            }}
          >
            <i className="fa-solid fa-bomb"></i> All Genres
          </li>
          {genres.map((genre) => (
            <li
              key={genre.id}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onGenreChange(genre.id);
                handleModal();
              }}
              className="filter-genre"
            >
              <i className="fa-solid fa-bomb"></i> {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FilterMovies;
