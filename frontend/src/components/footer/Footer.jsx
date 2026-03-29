import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {

    const { t } = useTranslation();

    return (

        <footer className={styles.footer}>

            <Link to="/" className={styles.logo}>
                Yonsekai
            </Link>

            <div className={styles.contact}>
                <h3>Nos contacts</h3>

                <ul>
                    <li>01 73 37 28 10</li>
                    <li>
                        <a href="mailto:yonsekai@hotmail.fr">
                            yonsekai@hotmail.fr
                        </a>
                    </li>
                    <li>Place des Pyramides 75001 Paris</li>
                </ul>
            </div>

            <div className={styles.infos}>
                <h3>Informations</h3>

                <ul>
                    <li>
                        <Link to="/reservation">{t("reserve")}</Link>
                    </li>

                    <li>
                        <Link to="/inscription">{t("titleSignup")}</Link>
                    </li>

                    <li>
                        <Link to="/connexion">{t("titleLogIn")}</Link>
                    </li>
                </ul>
            </div>

        </footer>

    );
};