import axios from "axios";

const API_KEY = "77794b003c88f0df6567795dd3310419";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return res.data;
};

export const getSimilarMovies = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: { api_key: API_KEY },
  });

  return res.data;
};