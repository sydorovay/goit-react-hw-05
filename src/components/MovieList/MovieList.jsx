import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримання інформації про поточну URL-адресу

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          key={movie.id}
          className={styles.movieCard}
          state={{ from: location }} // Передача інформації про поточну URL-адресу
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.movieOverview}>
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;