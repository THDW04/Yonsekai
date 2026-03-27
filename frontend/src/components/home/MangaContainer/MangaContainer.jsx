import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import { ImageTransitionMesh } from './ImageTransitionMesh';
import data from '../../../data/data.json';
import styles from './MangaContainer.module.css';

export const MangaContainer = () => {
  const containerRef = useRef();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const imagePaths = data.map(s => s.background);

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.canvasWrapper}>
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }} >
          <Suspense fallback={null}>
            <ImageTransitionMesh images={imagePaths} scrollContainer={containerRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className={styles.contentOverlay}>
        {data.map((section, i) => (
          <div key={i} className={styles.section}>
            <h2>{section.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};