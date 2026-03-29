import { useState } from 'react';
import styles from './Header.module.css';
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>

                <a href="#" className={styles.logo}>
                    <span><img src="/assets/img/logo.svg" alt="Retour en haut" /></span>
                    <span>Yonsekai</span>
                </a>

                <div className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
                    <span className={isOpen ? styles.open : ''}></span>
                    <span className={isOpen ? styles.open : ''}></span>
                    <span className={isOpen ? styles.open : ''}></span>
                </div>

                <div className={`${styles.navContent} ${isOpen ? styles.show : ''}`}>
                    <ul className={styles.navLinks}>
                        <li><a href="/#mangas" onClick={() => setIsOpen(false)}>{t("experience")}</a></li>
                        <li><a href="/#infos" onClick={() => setIsOpen(false)}>{t("information")}</a></li>
                    </ul>

                    <div className={styles.actions}>
                        <a href="/inscription" onClick={() => setIsOpen(false)}>Inscription</a>
                        <a href="/reservation" className={styles.reserveBtn} onClick={() => setIsOpen(false)}>
                            {t("reserve")}
                        </a>
                        <div className={styles.langSwitch}>
                            <select name="language" value={i18n.language} onChange={changeLanguage}>
                                <option value="fr">FR</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    );
};