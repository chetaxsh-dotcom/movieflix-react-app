import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "77794b003c88f0df6567795dd3310419";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";

export default function MovieDetails() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [credits, setCredits] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {

    const fetchData = async () => {
      try {

        // 🎬 Movie Details
        const res1 = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data1 = await res1.json();
        setMovie(data1);

        // 👥 Credits
        const res2 = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        const data2 = await res2.json();
        setCredits(data2);

        // 🎞️ Similar Movies (with pagination)
        const res3 = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&page=${page}`);
        const data3 = await res3.json();
        setSimilar(data3.results || []);

      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();

  }, [id, page]);

  if (!movie) return <p className="text-white p-10">Loading...</p>;

  // 🎬 Director
  const director = credits.crew?.find(c => c.job === "Director");

  // 🌍 Country
  const country = movie.production_countries?.[0]?.name;

  // 📅 Year
  const year = movie.release_date?.split("-")[0];

  // 🌐 Language mapping
  const languageMap = {
    en: "English",
    hi: "Hindi",
    fr: "French",
    es: "Spanish",
    ja: "Japanese",
  };

  const language =
    languageMap[movie.original_language] || movie.original_language;

  // ⭐ Rating
  const rating = movie.vote_average?.toFixed(1);

  return (
    <div className="text-white bg-black min-h-screen">

      {/*  BACKDROP */}
      <div
        className="h-[80vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `
          linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6)),
          url(${IMG_URL}${movie.backdrop_path})
          `
        }}
      >

        <div className="p-10 max-w-2xl">

          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="mt-4 text-gray-300">
            {movie.overview || "No description available."}
          </p>

          <div className="mt-4 space-y-1 text-gray-300">

            <p>⭐ Rating: {rating}</p>
            <p>📅 Year: {year || "N/A"}</p>
            <p>🎬 Director: {director?.name || "N/A"}</p>
            <p>🌍 Country: {country || "N/A"}</p>
            <p>🌐 Language: {language}</p>

          </div>

          <Link
            to="/"
            className="inline-block mt-5 bg-red-600 px-5 py-2 rounded hover:bg-red-700"
          >
            ⬅ Back to Home
          </Link>

        </div>
      </div>

      {/* 🎞️ RELATED MOVIES */}
      <div className="p-6 bg-black">

        <h2 className="text-2xl mb-4">Related Movies</h2>

        <div className="flex overflow-x-scroll gap-5 scrollbar-hide">

          {similar.map((m) => (
            <Link to={`/movie/${m.id}`} key={m.id}>
            <img
            src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
            alt={m.title}
            className="min-w-[180px] md:min-w-[220px] lg:min-w-[260px] h-[260px] md:h-[320px] lg:h-[360px] object-cover rounded-lg cursor-pointer hover:scale-110 transition duration-300"
                    />
            </Link>
          ))};

            </div>

        {/*  PAGINATION */}
        <div className="flex justify-center gap-6 mt-10">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            Prev
          </button>

          <span>{page}</span>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}