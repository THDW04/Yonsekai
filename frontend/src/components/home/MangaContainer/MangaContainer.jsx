import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

import { ImageTransitionMesh } from './ImageTransitionMesh';
import { MangaCard } from './MangaCard/MangaCard';

import data from '../../../js/data.json';
import styles from './MangaContainer.module.css';
import { useMangaTimeline } from './hooks/useMangaTimeline';

gsap.registerPlugin(ScrollTrigger);

export const MangaContainer = () => {
  const containerRef = useRef();
  const textRefs = useRef([]);
  const { t } = useTranslation();

  const switchSound = (elementName) => {
    window.dispatchEvent(new CustomEvent('changeSection', { detail: elementName }));
  };

  useMangaTimeline(containerRef, textRefs);

  const imagePaths = data.map(s => s.background);

  return (
    <section id='mangas' ref={containerRef} className={styles.container} style={{ height: `${data.length * 100}vh` }}>
      <div className={styles.scroller}>
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ImageTransitionMesh images={imagePaths} scrollContainer={containerRef} />
          </Suspense>
        </Canvas>

        <div className={styles.gl}>
          {data.map((section, i) => (
            <div key={i} className={styles.inner} ref={el => textRefs.current[i] = el}>
              <MangaCard
                title={t(`sections.${section.id}.title`)}
                element={t(`sections.${section.id}.element`)}
                text={t(`sections.${section.id}.text`)}
                kanji={section.kanji}
                background={section.background}
                img={section.charImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};