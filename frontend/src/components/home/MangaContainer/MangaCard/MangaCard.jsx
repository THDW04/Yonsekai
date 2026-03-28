import styles from './MangaCard.module.css';

export const MangaCard = ({ title, element, kanji }) => {

    return (
        <div className={styles.card}>
            <div className={styles.contentOverlay}>
                <div className={styles.container}>
                    <div className={styles.darkBox}></div>
                    <div className={styles.darkBox}></div>
                    <div className={styles.darkBox}></div>
                </div>

                <div className={styles.badges}>
                    <div className={styles.badge}>{element}</div>
                    <div className={styles.kanji}>{kanji}</div>
                </div>

                <h2 className={styles.title}>{title}</h2>
            </div>
        </div>
    );
}