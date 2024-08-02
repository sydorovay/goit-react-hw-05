import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
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

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a search query.');
      return;
    }
    setSearchParams({ query });
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
    setMovies([]);
    setError(null);
  };

  return (
    <div className={styles.moviesPage}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            id="movie-query"
            name="movie-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className={styles.input}
          />
          {query && (
            <button type="button" onClick={clearSearch} className={styles.clearButton}>
              &times;
            </button>
          )}
        </div>
      </form>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;