import React from "react";
import styles from "../Informations.module.css";
import { useTranslation } from "react-i18next";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export const ScheduleCard = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.scheduleCard}>
      <h3 className={styles.title}>{t("titleInformation")}</h3>

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
        <p>{t("infoEnd")}</p>

        <p
          dangerouslySetInnerHTML={{
            __html: t("infoThursday"),
          }}
        />

        <p>{t("infoClosed")}</p>
      </div>
    </div>
  );
};