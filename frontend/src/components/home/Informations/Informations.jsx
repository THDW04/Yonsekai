import React, { useRef } from 'react';
import { useSpotlightEffect } from './useSpotlightEffect';
import { ScheduleCard } from './ScheduleCard/ScheduleCard';
import { TransportCard } from './TransportCard/TransportCard';
import styles from './Informations.module.css';

export const Informations = () => {
    const spotlightRef = useRef(null);
    const imgRef = useRef(null);
    const lottieContainerRef = useRef(null);
    const lottieRef = useRef(null);
    const maskRef = useRef(null);

    useSpotlightEffect(spotlightRef, imgRef, lottieContainerRef, lottieRef, maskRef);

    return (
        <div ref={spotlightRef} className={styles.spotlight}>
            <div ref={lottieContainerRef} className={styles.lottieContainer}>
                <div ref={lottieRef} className={styles.lottie}></div>
                <div className={styles.fireGlow}></div>
            </div>

            <div className={styles.content}>
                <section className={styles.infos}>
                    <img ref={imgRef} src="assets/img/firewood.png" alt="" />
                    <h2>Avant le grand départ</h2>
                    <ScheduleCard />
                    <TransportCard />
                </section>
            </div>

            <div ref={maskRef} className={styles.mask}></div>
        </div>
    );
};
