
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";

const API_KEY = "77794b003c88f0df6567795dd3310419";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {

const [trending,setTrending] = useState([]);
const [action,setAction] = useState([]);
const [comedy,setComedy] = useState([]);
const [horror,setHorror] = useState([]);
const [crime,setCrime] = useState([]);
const [animation,setAnimation] = useState([]);

const [searchResults,setSearchResults] = useState([]);
const [isSearching,setIsSearching] = useState(false);

const [page,setPage] = useState(1);

const fetchMovies = async(url,setter)=>{

const res = await fetch(url);
const data = await res.json();

setter(data.results || []);

};

useEffect(()=>{

fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,setTrending);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`,setAction);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`,setComedy);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`,setHorror);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80,9648&page=${page}`,setCrime);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`,setAnimation);

},[page]);

const handleSearch = async(query,type)=>{

let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;

if(type){
url += `&with_genres=${type}`;
}

const res = await fetch(url);
const data = await res.json();

setSearchResults(data.results || []);
setIsSearching(true);

};

return(

<div className="bg-black text-white min-h-screen pt-20">

<SearchBar onSearch={handleSearch}/>

{isSearching ? (

<MovieRow title="Search Results" movies={searchResults}/>

):(

<>

<MovieRow title="Trending Now" movies={trending}/>

<MovieRow title="Action Movies" movies={action}/>

<MovieRow title="Comedy Movies" movies={comedy}/>

<MovieRow title="Horror Movies" movies={horror}/>

<MovieRow title="Crime & Mystery" movies={crime}/>

<MovieRow title="Animation Movies" movies={animation}/>

<div className="flex justify-center gap-6 mt-10">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
className="bg-gray-800 px-4 py-2 rounded"
>
Prev
</button>

<span className="text-lg">{page}</span>

<button
onClick={()=>setPage(page+1)}
className="bg-gray-800 px-4 py-2 rounded"
>
Next
</button>

</div>

</>

)}

</div>

);

};
