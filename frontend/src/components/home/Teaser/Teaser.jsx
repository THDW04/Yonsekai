import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Teaser.module.css'

export const Teaser = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(videoRef.current,
            {
                scale: 0.5,
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
        <div ref={sectionRef} className={styles.wrapper}>
            <video ref={videoRef} controls>
                <source src="/assets/accueil.webm" type="video/webm" />
                Votre navigateur ne supporte pas la vidéo.
            </video>
        </div>
    )
}