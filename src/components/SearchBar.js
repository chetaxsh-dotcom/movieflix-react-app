import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {

const [query,setQuery] = useState("");
const [type,setType] = useState("");

//  AUTO SEARCH WHEN FILTER CHANGES
useEffect(()=>{
  if(type){
    onSearch(query,type);
  }
},[type]);

const handleSubmit = (e) => {
  e.preventDefault();
  onSearch(query,type);
};

return(

<form onSubmit={handleSubmit} className="flex gap-4 justify-center mb-6">

<input
type="text"
placeholder="Search movies..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white-500" 
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
className="px-4 py-2 rounded bg-gray-900 text- border-gray-700 focus:ouline-none focus:ring-2 focus:ring-white-700 "
>

<option value="">All</option>
<option value="28">Action</option>
<option value="35">Comedy</option>
<option value="27">Horror</option>
<option value="80">Crime</option>
<option value="16">Animation</option>
<option value="18">Drama</option>


</select>

<button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">
Search
</button>

</form>

);

}