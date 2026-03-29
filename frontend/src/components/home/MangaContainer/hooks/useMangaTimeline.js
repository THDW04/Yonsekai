import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from '../../../../js/data.json';

export const useMangaTimeline = (containerRef, textRefs) => {

    useEffect(() => {
        gsap.set(textRefs.current[0], { opacity: 1, autoAlpha: 1 });
        gsap.set(textRefs.current.slice(1), { opacity: 0, autoAlpha: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            }
        });

        data.forEach((item, i) => {
            tl.to(textRefs.current[i], {
                opacity: 1,
                autoAlpha: 1,
                duration: 0.1,
                onStart: () => {
                    if (item.element) {
                        window.dispatchEvent(new CustomEvent('changeSection', { detail: item.element }));
                    }
                }
            }, i / data.length);

            if (i < data.length - 1) {
                tl.to(textRefs.current[i], {
                    opacity: 0,
                    autoAlpha: 0,
                    duration: 0.1,
                }, (i + 0.9) / data.length);
            }
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);
};