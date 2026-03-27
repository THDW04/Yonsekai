import React, { useEffect, useRef } from 'react';
import styles from './Interactions.module.css';

export const AirInteraction = () => {
  const containerRef = useRef();

  useEffect(() => {
    const clouds = containerRef.current.querySelectorAll(`.${styles.cloud}`);

    const cloudStates = Array.from(clouds).map(() => ({ x: 0, y: 0, gone: false }));

    const handleMouseMove = (e) => {
      clouds.forEach((cloud, i) => {
        if (cloudStates[i].gone) return;

        const rect = cloud.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 150) {
          // On calcule une direction d'éjection
          const angle = Math.atan2(distY, distX);

          // On projette le nuage très loin
          cloudStates[i].x -= Math.cos(angle) * 600;
          cloudStates[i].y -= Math.sin(angle) * 600;
          cloudStates[i].gone = true;

          cloud.style.transform = ` translate(${cloudStates[i].x}px, ${cloudStates[i].y}px)`
          cloud.style.opacity = "0";
          cloud.style.pointerEvents = "none";
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={styles.airWrapper}>
      <img src="/assets/img/clouds.png" className={styles.cloud} style={{ top: '0%', left: '50%' }} alt="" />
      <img src="/assets/img/clouds.png" className={styles.cloud} style={{ top: '0%', left: '0%' }} alt="" />
      <img src="/assets/img/clouds.png" className={styles.cloud} style={{ top: '50%', left: '10%' }} alt="" />
      <img src="/assets/img/clouds.png" className={styles.cloud} style={{ top: '40%', left: '70%' }} alt="" />
    </div>
  );
};