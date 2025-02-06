import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../App.css";
import { Link } from "react-router-dom";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MwODc5N2NhMGM3Y2RkYzQyNWVhODRhZDUzYjA3YSIsIm5iZiI6MTczODY5NjY3NC4xOTYsInN1YiI6IjY3YTI2N2UyZWVhODlhZGYwOTAzMGE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7Eht4l14qGyoqVRPXkKNRa_qzS7z4GctuE9hfjW26o'
  }
};

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
      .then((res) => res.json())
      .then((data) => setFilm(data))
      .catch((err) => console.error("Error al obtener detalles de la película:", err));
  }, [id]);

  if (!film) return <p>Cargando...</p>;

  return (
   
      <div className="film-card">
        <div className="film-left">
          <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} className="film-image" />
        </div>
        <div className="film-right">
          <h1 className="film-title">{film.title}</h1>
          <p><strong>Fecha:</strong> {new Date(film.release_date).toLocaleDateString("es-ES")}</p>
          <p><strong>Puntuación:</strong> {film.vote_count}</p>
          <p><strong>Puntuación Media:</strong> {film.vote_average}</p>
          <p><strong>Resumen:</strong> {film.overview || "No disponible"}</p>
          {film.homepage && (
            <p><strong>Ver en:</strong> <a href={film.homepage} target="_blank" rel="noopener noreferrer">{film.homepage}</a></p>
          )}
            <Link to={"/"}>
          <button className="back-button">VOLVER</button>
          </Link>
        </div>
      </div>
  
  );
}

export default FilmDetails;