/* eslint-disable react/prop-types */
import styles from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  if (!cast || cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div className={styles.movieCast}>
      <h2 className={styles.title}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className={styles.actorImage} />
            <p className={styles.actorName}>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default MovieCast;