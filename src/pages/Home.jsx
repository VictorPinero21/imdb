import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {

  const [films, setfilms] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Nombre recibido:", nombre); // Depuración: imprime la query recibida en la URL

  useEffect(() => {
    if (!nombre) return;

    setLoading(true);
    fetch(`https://api.pokemontcg.io/v2/films?q=name:${encodeURIComponent(nombre)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta de la API:", data); // Depuración: Verifica la respuesta de la API
        setfilms(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon films:", error);
        setLoading(false);
      });
  }, [nombre]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pokémon Card Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {films.length > 0 ? (
            films.map((film) => (
              <div
                key={card.id}
                className="border rounded-xl shadow-lg overflow-hidden"
              >
                <Link to ={`/card/${card.id}`}>
                <img
                  src={film.images.large}
                  alt={film.name}
                  className="w-full h-auto"
                />
                </Link>
                <div className="p-2">
                  <h2 className="text-lg font-semibold">{film.name}</h2>
                  <p className="text-gray-600">HP: {film.hp}</p>
                  <p className="text-gray-600">Set: {film.set.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No films to show</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
