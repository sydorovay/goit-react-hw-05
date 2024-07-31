import axiosInstance from './axiosConfig';

// Запит для отримання популярних фільмів
export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

// Запит для пошуку фільмів за ключовим словом
export const searchMovies = async (query) => {
  const response = await axiosInstance.get(`/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

// Запит для отримання деталей фільму
export const fetchMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: {
      language: 'en-US',
    },
  });
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
      page: 1,
    },
  });
  return response.data;
};