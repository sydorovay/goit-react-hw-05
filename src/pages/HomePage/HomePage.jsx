import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
