import React from "react";
import styles from "../Informations.module.css";
import { useTranslation } from "react-i18next";

const BUS_LINES = [28, 80, 82, 86, 92];

export const TransportCard = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.transportCard}>
      <h3 className={styles.title}>{t("titleTransport")}</h3>

      <div className={styles.infoBox}>
        <img
          src="/path-to-your-map.png"
          alt="Plan"
          className={styles.mapThumb}
        />

        <div className={styles.details}>
          <p className={styles.stationLabel}>{t("stationLabel")}</p>

         
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
                <span
                  key={num}
                  className={`${styles.busNum} ${styles[`bus${num}`]}`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.walking}>
            <span className={styles.walkIcon}>👣</span>
            <p>{t("walking")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};