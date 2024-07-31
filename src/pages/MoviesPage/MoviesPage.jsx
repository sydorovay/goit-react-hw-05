import { useState } from 'react';
import { searchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a search query.');
      return;
    }
    setError(null); 
    setLoading(true); 
    try {
      const results = await searchMovies(query);
      if (results.length === 0) {
        setError('No movies found.');
      } else {
        setMovies(results);
      }
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
      console.error('Failed to search movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.moviesPage}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          id="movie-query"
          name="movie-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      {loading && <p className={styles.loading}>Loading...</p>} {/* Індикатор завантаження */}
      {error && <p className={styles.error}>{error}</p>} {/* Повідомлення про помилки */}
      {movies.length > 0 && <MovieList movies={movies} />} {/* Відображення списку фільмів */}
    </div>
  );
};

export default MoviesPage;