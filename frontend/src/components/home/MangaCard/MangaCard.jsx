import React, { useEffect, useRef } from 'react';
import styles from './MangaCard.module.css'
//import gsap from 'gsap';

export const MangaCard = ({ title, element, kanji, text, background, charImg }) => {
  const cardRef = useRef(null);
  const charRef = useRef(null);

  /*useEffect(() => {
    gsap.fromTo(charRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
  }, []);*/

  return (
    <div className={styles.mangaCard} ref={cardRef}>
      <div className={styles.presentationManga} style={{ backgroundImage: `url(${background})` }}>
        <img src={charImg} alt="" />
        <div className="presentation-text">
          <p>{text}</p>
        </div>
      </div>

      <svg width="0" height="0">
        <clipPath id="mangaClipMobile" clipPathUnits="objectBoundingBox">
          <path d="M0 0 H1 V1 H0.82 Q0.8 1 0.8 0.98 V0.92 Q0.8 0.9 0.78 0.9 H0.62 Q0.6 0.9 0.6 0.88 V0.82 Q0.6 0.8 0.58 0.8 H0.42 Q0.4 0.8 0.4 0.78 V0.72 Q0.4 0.7 0.38 0.7 H0.02 Q0 0.7 0 0.68 Z " />
        </clipPath>

        <clipPath id="mangaClipDesktop" clipPathUnits="objectBoundingBox">
          <path d="M0 0 H1 V0.98 Q1 1 0.98 1 H0.57 Q0.55 1 0.55 0.98 V0.87 Q0.55 0.85 0.53 0.85 H0.47 Q0.45 0.85 0.45 0.83 V0.72 Q0.45 0.7 0.43 0.7 H0.32 Q0.3 0.7 0.3 0.68 V0.57 Q0.3 0.55 0.28 0.55 H0.01 Q0 0.55 0 0.53 V0 Z"/>
        </clipPath>
      </svg>

      <div className={styles.panel}> 
        <div className={styles.panelContent}>
          <p className={styles.element}>{element}</p>
          <p className={styles.kanji}>{kanji}</p>
        </div>
        <div className={styles.panelBottom}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};