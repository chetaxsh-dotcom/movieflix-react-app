import { useState, useEffect } from "react";

const SearchBar = ({ onSearch, initialQuery, initialType }) => {

  const [input, setInput] = useState(initialQuery || "");
  const [type, setType] = useState(initialType || "");

  useEffect(() => {
    setInput(initialQuery || "");
    setType(initialType || "");
  }, [initialQuery, initialType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input, type, 1);
  };

  return (
     <div className="w-full">

    {/*  HEADER */}
    <div className="flex items-center justify-between px-6 py-4 bg-black fixed top-0 left-0 w-full z-50">

      {/* LEFT - APP NAME */}
      <h1 className="text-red-600 text-2xl font-bold">
        MovieFlix
      </h1>

      {/* CENTER - SEARCH */}
      <form onSubmit={handleSubmit} className="flex gap-3">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies..."
          className="px-4 py-2 rounded bg-gray-800 text-white w-[250px]"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white rounded"
        >
          <option value="">All</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="27">Horror</option>
          <option value="80">Crime</option>
          <option value="16">Animation</option>
          <option value="18">Drama</option>
        </select>

        <button
          type="submit"
          className="bg-red-600 px-4 py-2 rounded text-white"
        >
          Search
        </button>

      </form>

      {/* RIGHT EMPTY SPACE (for balance) */}
      <div className="w-[100px]" />

    </div>

    {/*  SPACE FIX (important) */}
    <div className="h-[80px]" />

  </div>
);
};

export default SearchBar;