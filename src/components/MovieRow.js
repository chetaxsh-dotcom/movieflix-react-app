import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieRow({ title, movies }) {

const rowRef = useRef(null);
const navigate = useNavigate();

const scrollLeft = () => {
  rowRef.current.scrollBy({
    left: -400,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  rowRef.current.scrollBy({
    left: 400,
    behavior: "smooth",
  });
}; 

return (

<div className="relative mb-10 group">

{/* TITLE */}
<h2 className="text-white text-2xl font-semibold mb-4 px-6">
{title}
</h2>

{/* LEFT BTN */}
<button
onClick={scrollLeft}
className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
bg-black/70 text-white px-4 py-6 opacity-0 
group-hover:opacity-100"
>
{"<"}
</button>

{/* MOVIES */}
<div
ref={rowRef}
className="flex space-x-4 overflow-x-auto z-10 scrollbar-hide px-14 scroll-smooth"
>

{movies?.map((movie) => (

<div key={movie.id} className="min-w-[180px]">

<div
onClick={() => navigate(`/movie/${movie.id}`)}
className="cursor-pointer"
>

<img
src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
alt={movie.title}
className="w-full rounded hover:scale-110 transition"
/>

</div>

</div>

))}

</div>

{/* RIGHT BTN */}
<button
onClick={scrollRight}
className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
bg-black/70 text-white px-4 py-6 opacity-0 
group-hover:opacity-100"
>
{">"}
</button>

</div>

);

}