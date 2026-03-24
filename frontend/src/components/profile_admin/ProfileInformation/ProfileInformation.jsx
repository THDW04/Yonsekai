import styles from './ProfileInformation.module.css'
export const ProfileInformation = ({nom, prenom, mail}) => {
    return (
            <div className={styles.infosClient}>
                <h2>Vos informations</h2>
                <div>
                    <p><strong>Nom :</strong> {nom}</p>
                    <p><strong>Prénom :</strong> {prenom}</p>
                    <p><strong>Adresse mail :</strong> {mail}</p>
                </div>
            </div>
    )
}