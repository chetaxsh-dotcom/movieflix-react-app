import React, { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="bg-gray-900 p-4 rounded-lg">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded mb-3"
                />
              </Link>
              <h2 className="text-lg font-semibold">{movie.title}</h2>

              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-3 px-4 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
