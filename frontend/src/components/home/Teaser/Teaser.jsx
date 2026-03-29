import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Teaser.module.css'

export const Teaser = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    useEffect(() => {
        gsap.fromTo(videoRef.current,
            {
                scale: isMobile ? 0.85 : isTablet ? 0.7 : 0.5,
                borderRadius: "40px"
            },
            {
                scale: 1,
                borderRadius: "10px",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                }
            }
        );
    }, []);

    return (
        <>
        <div ref={sectionRef} className={styles.wrapper}>
            <video ref={videoRef} controls>
                <source src="/assets/accueil.webm" type="video/webm" />
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <div className={styles.links}>
                <a href="/reservation">Reserver</a>
                <a href="/game">Jouer au jeu</a>
            </div>
        </div>
        </>
    )
}