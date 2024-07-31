import axios from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjEyYTg0MzAyNGRiNzNiMGI5N2RlN2E5YTdlMzhiZSIsIm5iZiI6MTcyMjM3MTQ1MC44OTAwMjIsInN1YiI6IjY2YTk0NmFmNzhlNDg2MzRkNWNkMWU1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cCsWafmxhgLnxeSNN3bhwtiJ1q9GdM1l9wDoKvqfhAk';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default axiosInstance;