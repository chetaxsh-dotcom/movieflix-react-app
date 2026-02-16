import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieRow from "../components/MovieRow";

const API_KEY = "77794b003c88f0df6567795dd3310419"; 
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);

  const fetchMovies = async (url, setter) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setter(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      // 🔎 
      fetchMovies(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`,
        setTrendingMovies
      );


      setActionMovies([]);
      setComedyMovies([]);
      setHorrorMovies([]);
      setCrimeMovies([]);
      setAnimationMovies([]);
    } else {
      // 🎬 
      fetchMovies(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
        setTrendingMovies
      );

      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
        setActionMovies
      );

      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
        setComedyMovies
      );

      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
        setHorrorMovies
      );

      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80,9648`,
        setCrimeMovies
      );

      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`,
        setAnimationMovies
      );
    }
  }, [searchQuery]);

  return (
    <div className="bg-black min-h-screen pt-24">

      {searchQuery ? (
        <MovieRow title={`🔎 Search Results for "${searchQuery}"`} movies={trendingMovies} />
      ) : (
        <>
          <MovieRow title="🔥 Trending Now" movies={trendingMovies} />
          <MovieRow title="💥 Action Movies" movies={actionMovies} />
          <MovieRow title="😂 Comedy Movies" movies={comedyMovies} />
          <MovieRow title="👻 Horror Movies" movies={horrorMovies} />
          <MovieRow title="🕵 Crime & Mystery" movies={crimeMovies} />
          <MovieRow title="🎨 Animation Movies" movies={animationMovies} />
        </>
      )}

    </div>
  );
}
