
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.navigation}>
    <NavLink className={styles.navLink} to="/" end>Home</NavLink>
    <NavLink className={styles.navLink} to="/movies">Movies</NavLink>
  </nav>
);

export default Navigation;