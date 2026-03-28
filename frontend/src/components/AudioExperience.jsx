import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AudioExperience = ({ isStarted }) => {
  const ambientRef = useRef(new Audio('assets/sounds/ambient.mp3'));
  const sectionAudioRef = useRef(new Audio(''));
  const transitionSfx = useRef(new Audio('assets/sounds/transition.mp3'));

  useEffect(() => {
    if (!isStarted) return;

    ambientRef.current.play();
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.1;

    transitionSfx.current.volume = 0.2;
    const playTransitionSfx = () => {
      transitionSfx.current.currentTime = 0;
      transitionSfx.current.play();
    };
    window.addEventListener('transitionSound', playTransitionSfx);

    const handleSectionChange = (e) => {
      const element = e.detail;
      const soundPath = `assets/sounds/${element}.mp3`;

      gsap.to(sectionAudioRef.current, {
        volume: 0, duration: 0.3, onComplete: () => {
          sectionAudioRef.current.src = soundPath;
          sectionAudioRef.current.play();
          gsap.to(sectionAudioRef.current, { volume: 0.2, duration: 0.3 });
        }
      });
    };

    window.addEventListener('changeSection', handleSectionChange);
    return () => {
      window.removeEventListener('changeSection', handleSectionChange);
      window.removeEventListener('transitionSound', playTransitionSfx);
    }
  }, [isStarted]);

  return null;
};