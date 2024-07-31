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

  const { title, overview, poster_path, genres, release_date, vote_average } = movie;
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'placeholder.jpg';

  return (
    <div className={styles.movieDetailsPage}>
      <div className={styles.movieDetails}>
        <img src={posterUrl} alt={title} className={styles.poster} width={300} />
        <div className={styles.details}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.overview}>{overview}</p>
          <div className={styles.additionalInfo}>
            <p><strong>Genres:</strong> {genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Release Year:</strong> {new Date(release_date).getFullYear()}</p>
            <p><strong>Rating:</strong> {vote_average}</p>
            <Link to="cast" className={styles.link}>Cast</Link>
            <Link to="reviews" className={styles.link}>Reviews</Link>
          </div>
        </div>
      </div>
      <Routes className={styles.routes}>
        <Route path="cast" element={<MovieCast cast={cast} />} />
        <Route path="reviews" element={<MovieReviews reviews={reviews} />} />
      </Routes>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default MovieDetailsPage;