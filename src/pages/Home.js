import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";

const API_KEY = "77794b003c88f0df6567795dd3310419";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {

  const navigate = useNavigate();
  const location = useLocation();

  //  STATES
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 🎬 categories
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);
  const [animation, setAnimation] = useState([]);

  //  SEARCH FETCH (REAL LOGIC)
  const fetchSearch = async (q, t, p = 1) => {

  try {
    setError(false);

    if (!q && !t) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    let url = "";

    if (q) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&page=${p}`;
    } else {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${t}&page=${p}`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    let results = data.results || [];

    if (q && t) {
      let filtered = [];
      for (let i = 0; i < results.length; i++) {
        if (results[i].genre_ids?.includes(Number(t))) {
          filtered.push(results[i]);
        }
      }
      results = filtered;
    }

    setSearchResults(results);
    setIsSearching(true);

  } catch (err) {
    console.error(err);
    setError(true);  // 🔥 important
  }
};

  //  HANDLE SEARCH (NAVIGATION BASED)
  const handleSearch = (q, t, p = 1) => {
    navigate("/", {
      state: {
        query: q,
        type: t,
        page: p,
        fromSearch: true
      }
    });
  };

  //  HANDLE LOCATION STATE (MAIN FIX)
  useEffect(() => {

    if (location.state?.fromSearch) {

      const { query, type, page } = location.state;

      setQuery(query || "");
      setType(type || "");
      setPage(page || 1);

      fetchSearch(query, type, page);
    }

  }, [location.state]);

  //  HOMEPAGE FETCH
  useEffect(() => {

    if (isSearching) return;

    const fetchMovies = async (url, setter) => {
      const res = await fetch(`${url}&page=${page}`);
      const data = await res.json();
      setter(data.results || []);
    };

    fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`, setTrending);
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, setAction);
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`, setComedy);
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`, setHorror);
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80,9648`, setCrime);
    fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`, setAnimation);

  }, [page, isSearching]);

  return (
    <div className="bg-black text-white min-h-screen pt-10">
      {error && (
  <p className="text-red-500 text-center mt-10">
    Failed to load movies. Please try again.
  </p>
)}

      {/*  CENTER SEARCH */}
      <SearchBar
        onSearch={handleSearch}
        initialQuery={query}
        initialType={type}
      />

      {isSearching ? (

        <div className="px-6 mt-6">

          {/*  GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {searchResults.map((movie) => (

              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`, {
                  state: { query, type, page, fromSearch: true }
                })}
                className="cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="w-full rounded"
                  alt={movie.title}
                />
                <p className="text-sm mt-2">{movie.title}</p>
              </div>

            ))}

          </div>

          {/*  SEARCH PAGINATION */}
          <div className="flex justify-center gap-4 mt-8">

            <button
              onClick={() => handleSearch(query, type, page - 1)}
              disabled={page === 1}
              className="bg-gray-800 px-4 py-2 rounded"
            >
              Prev
            </button>

            <span>{page}</span>

            <button
              onClick={() => handleSearch(query, type, page + 1)}
              className="bg-gray-800 px-4 py-2 rounded"
            >
              Next
            </button>

          </div>

        </div>

      ) : (

        <>
          <MovieRow title="Trending Now" movies={trending}/>
          <MovieRow title="Action Movies" movies={action}/>
          <MovieRow title="Comedy Movies" movies={comedy}/>
          <MovieRow title="Horror Movies" movies={horror}/>
          <MovieRow title="Crime & Mystery" movies={crime}/>
          <MovieRow title="Animation Movies" movies={animation}/>

          {/*  HOME PAGINATION */}
          <div className="flex justify-center gap-4 mt-10">

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
        </>

      )}

    </div>
  );
}