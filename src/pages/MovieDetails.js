import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { WatchlistContext } from "../context/WatchlistContext";

function MovieDetails() {
  const { id } = useParams();
  const { addToWatchlist } = useContext(WatchlistContext);

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  const API_KEY = "77794b003c88f0df6567795dd3310419";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCredits(data));
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl font-semibold">
      Loading movie details...
      </div>

    );
  }

  const director =
    credits?.crew?.find((person) => person.job === "Director")?.name ||
    "Not Available";

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* Dark Gradient Overlay (lighter than before) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between px-16 pt-20">

        {/* LEFT SIDE DETAILS */}
        <div className="max-w-2xl">

          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            {movie.title}
          </h1>

          <div className="flex gap-6 text-gray-200 font-semibold mb-6">
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.release_date}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="space-y-2 text-gray-200 font-medium mb-6">
            <p>
              <span className="text-gray-400">Country:</span>{" "}
              {movie.production_countries?.map((c) => c.name).join(", ") || "N/A"}
            </p>

            <p>
              <span className="text-gray-400">Director:</span> {director}
            </p>

            <p>
              <span className="text-gray-400">Language:</span>{" "}
              {movie.spoken_languages?.[0]?.english_name || "N/A"}
            </p>
          </div>

          <p className="text-lg text-gray-100 leading-relaxed mb-8 font-medium">
            {movie.overview}
          </p>

          <button
            onClick={() => addToWatchlist(movie)}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            + Add to Watchlist
          </button>
        </div>


      </div>
    </div>
  );
}

export default MovieDetails;
