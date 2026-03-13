
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import MovieRow from "../components/MovieRow";

const API_KEY="77794b003c88f0df6567795dd3310419";
const BASE_URL="https://api.themoviedb.org/3";

export default function MovieDetails(){

const { id } = useParams();
const navigate = useNavigate();

const [movie,setMovie] = useState(null);
const [director,setDirector] = useState("");
const [country,setCountry] = useState("");
const [related,setRelated] = useState([]);

useEffect(()=>{

const fetchMovie = async()=>{

const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
const data = await res.json();

setMovie(data);

if(data.production_countries?.length){
setCountry(data.production_countries[0].name);
}

};

const fetchCredits = async()=>{

const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
const data = await res.json();

const dir = data.crew.find(p=>p.job==="Director");

if(dir){
setDirector(dir.name);
}

};

const fetchRelated = async()=>{

const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
const data = await res.json();

let movies = data.results;

if(!movies || movies.length===0){

const fallback = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
const fallbackData = await fallback.json();

movies = fallbackData.results;

}

setRelated(movies);

};

fetchMovie();
fetchCredits();
fetchRelated();

},[id]);

if(!movie){
return <p className="text-white p-10">Loading...</p>;
}

return(

<div className="bg-black text-white min-h-screen">

<div
className="relative h-[80vh] flex items-center"
style={{
backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-black/70"></div>

<div className="relative z-10 px-10 max-w-2xl">

<button
onClick={()=>navigate("/")}
className="mb-6 bg-gray-800 bg-red-600 px-4 py-2 rounded"
>
← Home
</button>

<h1 className="text-5xl font-bold mb-4">
{movie.title}
</h1>

<p className="text-gray-300 text-xl mb-4">
{movie.overview}
</p>

<p>⭐ {movie.vote_average?.toFixed(1)} / 10</p>

<p>Director:- {director}</p>

<p>Country:- {country}</p>

<p>Language:- {movie.spoken_languages?.[0]?.english_name}</p>

<p>Release Date:- {movie.release_date}</p>

<button className="mt-4 bg-red-600 px-5 py-2 rounded">
Add to Watchlist
</button>

</div>

</div>

<div className="mt-10">

<MovieRow title="Related Movies" movies={related}/>

</div>

</div>

);

}

