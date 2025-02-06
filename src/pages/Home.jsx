import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MwODc5N2NhMGM3Y2RkYzQyNWVhODRhZDUzYjA3YSIsIm5iZiI6MTczODY5NjY3NC4xOTYsInN1YiI6IjY3YTI2N2UyZWVhODlhZGYwOTAzMGE0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7Eht4l14qGyoqVRPXkKNRa_qzS7z4GctuE9hfjW26o'
    }
  };

  const Home = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const { id: query } = useParams(); 
    const navigate = useNavigate();
 

    const handleSearch = (e) => {
        navigate(`/${e.target.value}`);
      };
    
     
  
      useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch(
              query
                ? `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=es-ES&page=${page}`
                : `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`,
              options
            );
            const data = await response.json();
            setMovies(data.results || []);
          } catch (error) {
            console.error("Error al obtener películas:", error);
          }
        };
    
        fetchMovies();
      }, [query, page]);

      return (
        <div className="container">
         
            <input
              type="text"
              value={query || ""}
              onChange={handleSearch}
              placeholder="Buscar una película"
              className="w-full p-3 border rounded-xl shadow-md"
            />
           
         
    
          <div className="pagination-buttons">
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)} className="nav-button">Atrás</button>
            <button onClick={() => setPage(page + 1)} className="nav-button">Siguiente</button>
          </div>
    
          <h2 className="title">{query ? `Resultados de "${query}"` : "Películas Populares"}</h2>
    
          <div className="grid-container">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className="card">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="poster"
                  />
                  <div className="card-content">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="release-date">{new Date(movie.release_date).toLocaleDateString("es-ES")}</p>
                    <Link to={`/film/${movie.id}`}>
                      <button className="detail-button">Detalle</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
        </div>
      );
};


export default Home;
