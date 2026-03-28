import React from 'react';
import styles from '../Informations.module.css';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export const ScheduleCard = () => (
    <div className={styles.scheduleCard}>
        <h3 className={styles.title}>Horaires</h3>

        <div className={styles.grid}>
            {DAYS.map((day, i) => (
                <div key={day} className={styles.dayCol}>
                    <span className={styles.dayName}>{day}</span>
                    <div className={styles.hours}>
                        {i < 5 ? (
                            <span>10h - 18h</span>
                        ) : (
                            <span className={styles.closed}>Fermé</span>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <div className={styles.footerText}>
            <p>Dernier accès au musée à 17h, dernier accès aux expositions à 17h15, fermeture des salles à partir de 17h30.</p>
            <p><strong>Nocturne le jeudi jusqu'à 21h45.</strong> Dernier accès au musée et aux expositions à 21h, fermeture des salles à partir de 21h15.</p>
            <p>Fermé tous les lundis, les 1er mai et 25 décembre.</p>
        </div>
    </div>
);
