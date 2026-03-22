import React from 'react';
import { MangaCard } from './MangaCard/MangaCard';
import mangaData from '../../data/data.json';

export const MangaContainer= () => {
  return (
    <section className="expo-grid">
      {mangaData.map((manga) => (
        <MangaCard 
          key={manga.id} 
          title={manga.title}
          element={manga.element}
          kanji={manga.kanji}
          text={manga.text}
          background={manga.background}
          charImg={manga.charImg}
        />
      ))}
    </section>
  );
};