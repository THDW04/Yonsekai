import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useTranslation } from "react-i18next";

export const Header = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>

                <Link to="/" className={styles.logo}>
                    <span><img src="/assets/img/logo.svg" alt="" /></span>
                    <span>Yonsekai</span>
                </Link>

                <ul className={styles.navLinks}>
                    <li><Link to="/">{t("experience")}</Link></li>
                    <li><a href="/#mangas">{t("information")}</a></li>
                </ul>

                <div className={styles.actions}>

                    {/* SWITCH LANGUE */}
                    <div className={styles.langSwitch}>
                        <button onClick={() => changeLanguage("fr")}>FR</button>
                        <button onClick={() => changeLanguage("en")}>EN</button>
                    </div>

                    <Link to="/connexion" className={styles.reserveBtn}>
                        {t("reserve")}
                    </Link>

                </div>
            </nav>
        </header>
    );
};