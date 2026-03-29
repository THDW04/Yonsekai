import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ImageTransitionMesh } from './ImageTransitionMesh';
import { AirInteraction } from './Interactions/AirInteraction';
import { MangaCard } from './MangaCard/MangaCard';

import data from '../../../js/data.json';
import styles from './MangaContainer.module.css';
import { useMangaTimeline } from './hooks/useMangaTimeline';

gsap.registerPlugin(ScrollTrigger);

export const MangaContainer = () => {
  const containerRef = useRef();
  const textRefs = useRef([]);

  const switchSound = (elementName) => {
    window.dispatchEvent(new CustomEvent('changeSection', { detail: elementName }));
  };

  useMangaTimeline(containerRef, textRefs);

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
              {section.element == 'air' && i === 0 && <AirInteraction />}
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
                text={section.text}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};