import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjEyYTg0MzAyNGRiNzNiMGI5N2RlN2E5YTdlMzhiZSIsIm5iZiI6MTcyMjM3MTQ1MC44OTAwMjIsInN1YiI6IjY2YTk0NmFmNzhlNDg2MzRkNWNkMWU1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cCsWafmxhgLnxeSNN3bhwtiJ1q9GdM1l9wDoKvqfhAk';
const BASE_URL = 'https://api.themoviedb.org/3';
const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, { headers });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query },
    headers,
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, { headers });
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, { headers });
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, { headers });
  return response.data.results;
};
  