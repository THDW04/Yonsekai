import React from 'react';
import styles from '../Informations.module.css';

const BUS_LINES = [28, 80, 82, 86, 92];

export const TransportCard = () => (
    <div className={styles.transportCard}>
        <h3 className={styles.title}>Venir à l'exposition :</h3>

        <div className={styles.infoBox}>
            <img src="/path-to-your-map.png" alt="Plan" className={styles.mapThumb} />

            <div className={styles.details}>
                <p className={styles.stationLabel}>Station de métro la plus proche</p>
                <h3 className={styles.stationName}>École Militaire</h3>
                <span className={styles.distance}>800 mètres</span>

                <div className={styles.lines}>
                    <div className={styles.metroGroup}>
                        <span className={`${styles.icon} ${styles.mIcon}`}>M</span>
                        <span className={`${styles.icon} ${styles.line8}`}>8</span>
                    </div>

                    <div className={styles.busGroup}>
                        <span className={styles.busLabel}>BUS</span>
                        {BUS_LINES.map((num) => (
                            <span key={num} className={`${styles.busNum} ${styles[`bus${num}`]}`}>
                                {num}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.walking}>
                    <span className={styles.walkIcon}>👣</span>
                    <p>Marcher Rue du Colonel 8min</p>
                </div>
            </div>
        </div>
    </div>
);
