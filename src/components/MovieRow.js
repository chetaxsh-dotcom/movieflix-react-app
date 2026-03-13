import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {

  const rowRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scrollLeft = () => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-10 group">

      {/* ROW TITLE */}
      <h2 className="text-white text-2xl font-semibold mb-4 px-6">
        {title}
      </h2>

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
        bg-black/70 text-white px-4 py-6 opacity-0 
        group-hover:opacity-100 transition duration-300"
      >
        {"<"}
      </button>

      {/* MOVIE ROW */}
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-scroll scrollbar-hide px-14 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
        bg-black/70 text-white px-4 py-6 opacity-0 
        group-hover:opacity-100 transition duration-300"
      >
        {">"}
      </button>

    </div>
  );
}