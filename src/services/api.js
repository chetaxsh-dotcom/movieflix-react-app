import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_KEY;
const BASE_URL = "https://www.omdbapi.com/";


console.log("API KEY:", API_KEY);

export const searchMovies = async (searchTerm, page = 1, type = "") => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      page: page,
      type: type,
    },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  });

  return response.data;
};
