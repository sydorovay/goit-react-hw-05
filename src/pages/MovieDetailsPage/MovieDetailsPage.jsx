import { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.movieDetailsPage}>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;