import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api'; // Переконайтесь, що цей метод імпортовано з вашого API-файлу
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams(); // Отримання movieId з URL
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        const creditsData = await fetchMovieCredits(movieId);
        setCast(creditsData.cast);
      } catch (error) {
        setError('Failed to fetch cast information.');
        console.error('Failed to fetch movie credits:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovieCredits();
  }, [movieId]); // Виконання API-запиту при зміні movieId

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cast || cast.length === 0) return <p>No cast information available.</p>;

  return (
    <div className={styles.movieCast}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p className={styles.actorName}>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;