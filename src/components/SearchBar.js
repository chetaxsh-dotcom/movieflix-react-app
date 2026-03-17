
import { useState } from "react";

const SearchBar  = ({ onSearch }) => {

  const [input, setInput] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(input.trim(), type);
    setInput(""); // optional (clear after search)

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center mt-6 gap-3"
    >

      <div className="relative w-full max-w-xl">

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies..."
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white"
        />

      </div>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="bg-gray-800 text-white px-4 py-3 rounded-lg"
      >
        <option value="">All</option>
        <option value="28">Action</option>
        <option value="35">Comedy</option>
        <option value="27">Horror</option>
        <option value="80">Crime</option>
        <option value="16">Animation</option>
      </select>

      <button
        type="submit"
        className="bg-red-600 px-5 py-3 rounded-lg text-white"
      >
        Search
      </button>

    </form>
  );
};

export default SearchBar;

