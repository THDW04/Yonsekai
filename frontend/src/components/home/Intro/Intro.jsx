import { useEffect, useRef } from 'react'
import gsap from 'gsap';
import styles from './Intro.module.css'

export const Intro = ({ onComplete }) => {
    const maskRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to(maskRef.current, {
            maskImage: "radial-gradient(circle, transparent 150%, black 150%)",
            webkitMaskImage: "radial-gradient(circle, transparent 150%, black 150%)",
            duration: 5,
            ease: "power2.inOut"
        });

    }, [onComplete]);

    return (
        <section className={styles.intro}>
            <div ref={maskRef} className={styles.mask}></div>
        </section>
    )
}