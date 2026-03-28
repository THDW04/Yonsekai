import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.logo}> <span><img src="/assets/img/logo.svg" alt=""/></span>
                <span>Yonsekai</span></Link>

                <ul className={styles.navLinks}>
                    <li><Link to="/">L'expérience</Link></li>
                    <li><a href='/#mangas'>Informations</a></li>
                </ul>

                <div className={styles.actions}>
                    <button className={styles.langSwitch}>FR</button>
                    <Link to="/connexion" className={styles.reserveBtn}>Réserver</Link>
                </div>
            </nav>
        </header>
    );
};