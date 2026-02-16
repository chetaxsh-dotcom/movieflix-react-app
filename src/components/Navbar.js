import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/?search=${query}`);
    setQuery("");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50 shadow-md h-16 flex items-center">

      {/* Logo - Left */}
      <div className="absolute left-6">
        <Link to="/" className="text-red-600 text-2xl font-bold">
          MovieFlix
        </Link>
      </div>

      {/* Search - Center */}
      <div className="w-full flex justify-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-80 px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 px-4 py-2 rounded-r-md hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>
      </div>

    </div>
  );
}
