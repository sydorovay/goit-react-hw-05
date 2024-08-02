import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api'; // Переконайтесь, що цей метод імпортовано з вашого API-файлу
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        setError('Failed to fetch reviews.');
        console.error('Failed to fetch movie reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]); // Виконання API-запиту при зміні movieId

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className={styles.movieReviews}>
      <h2 className={styles.title}>Reviews</h2>
      <ul className={styles.reviewList}>
        {reviews.map(review => (
          <li key={review.id} className={styles.reviewItem}>
            <h3 className={styles.author}>Author: {review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;