import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  if (!movie.poster_path) return null;

  return (
    <Link to={`/movie/${movie.id}`} className="min-w-[180px]">
      <div className="transform hover:scale-110 transition duration-300">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
      </div>
    </Link>
  );
}
