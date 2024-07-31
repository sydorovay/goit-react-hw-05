import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../../api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    const getMovieCredits = async () => {
      try {
        const creditsData = await fetchMovieCredits(movieId);
        setCast(creditsData.cast);
      } catch (error) {
        console.error('Failed to fetch movie credits:', error);
      }
    };

    const getMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Failed to fetch movie reviews:', error);
      }
    };

    getMovieDetails();
    getMovieCredits();
    getMovieReviews();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, overview, poster_path } = movie;
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'placeholder.jpg';

  return (
    <div className={styles.movieDetailsPage}>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>Go back</button>
      <div className={styles.movieDetails}>
        <img src={posterUrl} alt={title} className={styles.poster} />
        <div className={styles.details}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overview}>{overview}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <Link to="cast" className={styles.link}>Cast</Link>
        <Link to="reviews" className={styles.link}>Reviews</Link>
      </div>
      <Routes >
        <Route path="cast" element={<MovieCast cast={cast} />} />
        <Route path="reviews" element={<MovieReviews reviews={reviews} />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;