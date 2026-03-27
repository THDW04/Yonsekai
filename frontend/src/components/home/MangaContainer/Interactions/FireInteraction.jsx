import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import fireAnimation from '../../../../js/Fire.json'; // Ton fichier JSON
import styles from './Interactions.module.css';

export const FireInteraction = () => {
    // 1. Déclaration des Refs pour cibler les éléments sans document.querySelector
    const spotlightRef = useRef(null);
    const lottieContainerRef = useRef(null);
    const lottieRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        const spotlight = spotlightRef.current;
        const lottieContainer = lottieContainerRef.current;
        const lottieElem = lottieRef.current;

        const state = {
            isTracking: true, 
            cursorDetected: false,
        };

        const pos = {
            mouse: { target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, last: { x: 0, y: 0 } },
            lottie: { current: { x: 0, y: 0 }, center: { x: 0, y: 0 } }
        };

        const anim = lottie.loadAnimation({
            container: lottieElem,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: fireAnimation,
        });

        function init() {
            const spotlightRect = spotlight.getBoundingClientRect();
            const lottieRect = lottieElem.getBoundingClientRect();

            pos.lottie.center.x = lottieRect.left - spotlightRect.left + lottieRect.width / 2;
            pos.lottie.center.y = lottieRect.top - spotlightRect.top + lottieRect.height / 2;

            pos.mouse.current.x = pos.mouse.target.x = spotlightRect.width / 2;
            pos.mouse.current.y = pos.mouse.target.y = spotlightRect.height / 2;
        }

        function updateCursor(x, y) {
            state.cursorDetected = true;
            pos.mouse.last.x = x;
            pos.mouse.last.y = y;

            const spotlightRect = spotlight.getBoundingClientRect();
            pos.mouse.target.x = x - spotlightRect.left;
            pos.mouse.target.y = y - spotlightRect.top;
        }

        let requestId;
        function animate() {
            pos.mouse.current.x += (pos.mouse.target.x - pos.mouse.current.x) * 0.1;
            pos.mouse.current.y += (pos.mouse.target.y - pos.mouse.current.y) * 0.1;

            if (state.cursorDetected && !maskRef.current.classList.contains(styles.active)) {
                maskRef.current.classList.add(styles.active);
            }

            spotlight.style.setProperty("--mouse-x", `${pos.mouse.current.x}px`);
            spotlight.style.setProperty("--mouse-y", `${pos.mouse.current.y}px`);

            const targetX = state.isTracking ? pos.mouse.current.x - pos.lottie.center.x : 0;
            const targetY = state.isTracking ? pos.mouse.current.y - pos.lottie.center.y : 0;

            pos.lottie.current.x += (targetX - pos.lottie.current.x) * 0.1;
            pos.lottie.current.y += (targetY - pos.lottie.current.y) * 0.1;

            lottieContainer.style.transform = `translate(${pos.lottie.current.x}px, ${pos.lottie.current.y}px)`;

            requestId = requestAnimationFrame(animate);
        }

        const onMouseMove = (e) => updateCursor(e.clientX, e.clientY);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", init);

        // Lancement
        init();
        animate();

        // --- NETTOYAGE (Important en React) ---
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", init);
            cancelAnimationFrame(requestId);
            anim.destroy();
        };
    }, []);

    return (
        <div ref={spotlightRef} className={styles.spotlight}>
            <div ref={lottieContainerRef} className={styles.lottieContainer}>
                <div ref={lottieRef} className={styles.lottie}></div>
                <div className={styles.fireGlow}></div>
            </div>
            <div className={styles.content}>
                <h2>Élément Feu</h2>
                <p>Le texte caché apparaît ici...</p>
            </div>
            <div ref={maskRef} className={styles.mask}></div>
        </div>
    );
};