import styles from './ProfileInformation.module.css'
import { useTranslation } from "react-i18next";
export const ProfileInformation = ({nom, prenom, mail}) => {

      const { t } = useTranslation();
    return (
            <div className={styles.infosClient}>
                <h2>{t("titleInformation")}</h2>
                <div>
                    <p><strong>Nom :</strong> {nom}</p>
                    <p><strong>Prénom :</strong> {prenom}</p>
                    <p><strong>Adresse mail :</strong> {mail}</p>
                </div>
            </div>
    )
}