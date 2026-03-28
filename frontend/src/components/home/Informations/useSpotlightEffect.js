import { useEffect } from 'react';
import lottie from 'lottie-web';
import fireAnimation from '../../../js/Fire.json';
import styles from './Informations.module.css';

export function useSpotlightEffect(
    spotlightRef,
    imgRef,
    lottieContainerRef,
    lottieRef,
    maskRef
) {
    useEffect(() => {
        const spotlight = spotlightRef.current;
        const lottieContainer = lottieContainerRef.current;
        const lottieElem = lottieRef.current;

        const state = {
            isTracking: true,
        };

        const mouse = { x: 0, y: 0 };

        const pos = {
            current: { x: 0, y: 0 },
            target: { x: 0, y: 0 },
            lottie: { current: { x: 0, y: 0 }, center: { x: 0, y: 0 } },
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
            const lottieW = lottieContainer.offsetWidth;
            const lottieH = lottieContainer.offsetHeight;
            const imgRect = imgRef.current.getBoundingClientRect();

            const baseX = imgRect.left - spotlightRect.left + imgRect.width / 2 - lottieW / 2;
            const baseY = imgRect.top - spotlightRect.top - 30;

            lottieContainer.style.left = `${baseX}px`;
            lottieContainer.style.top = `${baseY}px`;

            pos.lottie.center.x = baseX + lottieW / 2;
            pos.lottie.center.y = baseY + lottieH / 2;

            pos.lottie.current.x = 0;
            pos.lottie.current.y = 0;
            lottieContainer.style.transform = `translate(0px, 0px)`;

            pos.current.x = pos.target.x = pos.lottie.center.x;
            pos.current.y = pos.target.y = pos.lottie.center.y;
        }

        let requestId;
        function animate() {
            const elUnderCursor = document.elementFromPoint(mouse.x, mouse.y);
            const isOver = elUnderCursor && spotlight.contains(elUnderCursor);

            if (isOver) {
                const rect = spotlight.getBoundingClientRect();
                pos.target.x = mouse.x - rect.left;
                pos.target.y = mouse.y - rect.top;

                if (!maskRef.current.classList.contains(styles.active)) {
                    maskRef.current.classList.add(styles.active);
                }
            } else {
                pos.target.x = pos.lottie.center.x;
                pos.target.y = pos.lottie.center.y;

                if (maskRef.current.classList.contains(styles.active)) {
                    maskRef.current.classList.remove(styles.active);
                }
            }

            pos.current.x += (pos.target.x - pos.current.x) * 0.25;
            pos.current.y += (pos.target.y - pos.current.y) * 0.25;

            spotlight.style.setProperty('--mouse-x', `${pos.current.x}px`);
            spotlight.style.setProperty('--mouse-y', `${pos.current.y}px`);

            const targetX = state.isTracking ? pos.current.x - pos.lottie.center.x : 0;
            const targetY = state.isTracking ? pos.current.y - pos.lottie.center.y : 0;

            pos.lottie.current.x += (targetX - pos.lottie.current.x) * 0.5;
            pos.lottie.current.y += (targetY - pos.lottie.current.y) * 0.5;

            lottieContainer.style.transform = `translate(${pos.lottie.current.x}px, ${pos.lottie.current.y}px)`;

            requestId = requestAnimationFrame(animate);
        }

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', init);

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', init);
            cancelAnimationFrame(requestId);
            anim.destroy();
        };
    }, [imgRef, lottieContainerRef, lottieRef, maskRef, spotlightRef]);
}