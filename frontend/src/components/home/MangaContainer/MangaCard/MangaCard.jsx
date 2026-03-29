import styles from './MangaCard.module.css';

export const MangaCard = ({ title, element, kanji, text, img }) => {
    const profiles = {
        compact: { '--darkBox-height': '14vh', '--container-width': '55vw', '--container-bottom': '0', '--badge-bottom': '25%', '--badge-width': '30%' },
        wide: { '--darkBox-height': '15vh', '--container-width': '65vw', '--container-bottom': '-50px', '--badge-bottom': '18%', '--badge-width': '40%' },
    };

    const elementStyles = {
        fire: { ...profiles.compact, '--card-bg': 'rgba(95, 0, 0, 0.45)' },
        water: { ...profiles.wide, '--card-bg': 'rgba(0, 5, 64,0.45)' },
        earth: { ...profiles.wide, '--card-bg': 'rgba(14, 61, 24,0.45)' },
        air: { ...profiles.compact, '--card-bg': 'rgba(238, 238, 238, 0.45)', '--color': "#043162" },
    };

    const darkBoxCount = ['air', 'fire'].includes(element) ? 3 : 2;

    return (
        <div id={element} className={styles.card} style={elementStyles[element]}>
            <div className={styles.contentOverlay}>
                <div className={styles.container}>
                    {Array.from({ length: darkBoxCount }).map((_, i) => (
                        <div key={i} className={styles.darkBox}></div>
                    ))}
                </div>

                <img className={styles.character} src={img} alt="" />

                <div className={styles.text}>
                    <p>{text}</p>
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