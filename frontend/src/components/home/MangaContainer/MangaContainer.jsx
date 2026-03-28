import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageTransitionMesh } from './ImageTransitionMesh';
import { AirInteraction } from './Interactions/AirInteraction';
import { MangaCard } from './MangaCard/MangaCard';
import data from '../../../js/data.json';
import styles from './MangaContainer.module.css';

gsap.registerPlugin(ScrollTrigger);

export const MangaContainer = () => {
  const containerRef = useRef();
  const textRefs = useRef([]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.set(textRefs.current[0], { opacity: 1, autoAlpha: 1 });
    gsap.set(textRefs.current.slice(1), { opacity: 0, autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    data.forEach((_, i) => {
      tl.to(textRefs.current[i], {
        opacity: 1,
        autoAlpha: 1,
        duration: 0.1
      }, i / data.length);

      if (i < data.length - 1) {
        tl.to(textRefs.current[i], {
          opacity: 0,
          autoAlpha: 0,
          duration: 0.1
        }, (i + 0.9) / data.length);
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const imagePaths = data.map(s => s.background);

  return (
    <section ref={containerRef} className={styles.container} style={{ height: `${data.length * 100}vh` }}>
      <div className={styles.scroller}>
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ImageTransitionMesh images={imagePaths} scrollContainer={containerRef} />
          </Suspense>
        </Canvas>

        <div className={styles.interactionLayer}>
          {data.map((section, i) => (
            <div key={`inter-${i}`} className={styles.fullScreenSection}>
              {i === 0 && <AirInteraction />}
            </div>
          ))}
        </div>

        <div className={styles.gl}>
          {data.map((section, i) => (
            <div key={i} className={styles.inner} ref={el => textRefs.current[i] = el}>
              <MangaCard
                title={section.title}
                element={section.element}
                kanji={section.kanji}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};