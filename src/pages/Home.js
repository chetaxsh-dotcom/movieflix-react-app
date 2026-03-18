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
const [drama,setDrama] = useState([]);

//  MAIN STATES
const [query,setQuery] = useState("");
const [type,setType] = useState("");

const [searchResults,setSearchResults] = useState([]);
const [isSearching,setIsSearching] = useState(false);

const [page,setPage] = useState(1);

// 🎬 CATEGORY FETCH
const fetchMovies = async(url,setter)=>{
  try{
    const res = await fetch(url);
    const data = await res.json();
    setter(data.results || []);
  }catch(err){
    console.error(err);
  }
};

// 🎬 LOAD CATEGORY ROWS
useEffect(()=>{

fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`,setTrending);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page}`,setAction);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page}`,setComedy);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}`,setHorror);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=80,9648&page=${page}`,setCrime);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`,setAnimation);

fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18&page=${page}`,setDrama);

},[page]);

//  MAIN SEARCH + FILTER LOGIC (AUTO RUN)
useEffect(()=>{

if(!query && !type){
  setIsSearching(false);
  return;
}

const fetchSearch = async()=>{

try{

let url = "";

if(query){
  url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
}else{
  url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${type}&page=${page}`;
}

const res = await fetch(url);
const data = await res.json();

let results = data.results || [];

//  NO filter() used (as per requirement)
if(query && type){

let filtered = [];

for(let i=0;i<results.length;i++){
  if(results[i].genre_ids?.includes(Number(type))){
    filtered.push(results[i]);
  }
}

results = filtered;

}

setSearchResults(results);
setIsSearching(true);

}catch(err){
console.error("Search error:",err);
}

};

fetchSearch();

},[query,type,page]);

//  SEARCHBAR INPUT HANDLE
const handleSearch = (q,t)=>{
setQuery(q);
setType(t);
setPage(1); // reset page
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
<MovieRow title="Drama Movies" movies={drama}/>

</>

)}

{/*  PAGINATION (WORKS FOR BOTH) */}
<div className="flex justify-center gap-6 mt-10 pb-10">

<button
onClick={()=>setPage(page-1)}
disabled={page===1}
className="bg-gray-800 px-4 py-2 rounded"
>
Prev
</button>

<span>{page}</span>

<button
onClick={()=>setPage(page+1)}
className="bg-gray-800 px-4 py-2 rounded"
>
Next
</button>

</div>

</div>

);

}