import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useTranslation } from "react-i18next";

<<<<<<< Updated upstream
export const Header = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };
=======
export const Header = ({ hasAudio, setHasAudio }) => {
    const [isOpen, setIsOpen] = useState(false);
>>>>>>> Stashed changes

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
<<<<<<< Updated upstream

                <Link to="/" className={styles.logo}>
                    <span>
                        <img src="/assets/img/logo.svg" alt="Yonsekai logo" />
                    </span>
                    <span>Yonsekai</span>
                </Link>

                <ul className={styles.navLinks}>
                    <li><Link to="/">{t("experience")}</Link></li>
                    <li><a href="/#mangas">{t("information")}</a></li>
                </ul>

                <div className={styles.actions}>

                    
                    <div className={styles.langSwitch}>
                        <select
                            name="language"
                            value={i18n.language}
                            onChange={changeLanguage}
                        >
                            <option value="fr">FR</option>
                            <option value="en">EN</option>
                        </select>
                    </div>

                    <Link to="/connexion" className={styles.reserveBtn}>
                        {t("reserve")}
                    </Link>

=======
                <Link to="/" className={styles.logo} onClick={() => setIsOpen(false)}>
                    <img src="/assets/img/logo.svg" alt="Logo" />
                    <span>Yonsekai</span>
                </Link>

                <div className={`${styles.burger} ${isOpen ? styles.active : ''}`} 
                     onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`${styles.navContent} ${isOpen ? styles.show : ''}`}>
                    <ul className={styles.navLinks}>
                        <li><Link to="/" onClick={() => setIsOpen(false)}>L'expérience</Link></li>
                        <li><a href='/#mangas' onClick={() => setIsOpen(false)}>Informations</a></li>
                    </ul>

                    <div className={styles.actions}>
                        <a href="/reservation" className={styles.reserveBtn} onClick={() => setIsOpen(false)}>
                            Réserver
                        </a>
                        <button className={styles.muteBtn} onClick={() => setHasAudio(!hasAudio)}>
                            {hasAudio ? '🔊' : '      🔇'}
                        </button>
                        <button className={styles.langSwitch}>FR</button>
                    </div>
>>>>>>> Stashed changes
                </div>
            </nav>
        </header>
    );
};