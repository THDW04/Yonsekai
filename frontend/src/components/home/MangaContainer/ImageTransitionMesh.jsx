import React, { useMemo, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from "@react-three/drei";
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vertexShader2, fragmentShader2 } from '../../../js/shaders';

gsap.registerPlugin(ScrollTrigger);

export const ImageTransitionMesh = ({ images, scrollContainer }) => {
  const meshRef = useRef();
  const { size } = useThree(); 
  
  const textures = useTexture(images);
  const displacement = useTexture("assets/img/13.jpg"); 

  const state = useRef({ currentIndex: 0, isTransitioning: false });

  const uniforms = useMemo(() => ({
    u_texture0: { value: textures[0] },
    u_texture1: { value: textures[0] },
    u_displacement: { value: displacement },
    u_progress: { value: 0 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_texRes0: { value: new THREE.Vector2(textures[0].image.width, textures[0].image.height) },
    u_texRes1: { value: new THREE.Vector2(textures[0].image.width, textures[0].image.height) },
    u_strength: { value: 0.8 },
    u_rgbShift: { value: 0.05 },
    u_scale: { value: 0.15 }
  }), [textures, displacement]); 

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_resolution.value.set(size.width, size.height);
    }
  }, [size]); 

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: scrollContainer.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const newIndex = Math.round(self.progress * (textures.length - 1));
        if (newIndex !== state.current.currentIndex && !state.current.isTransitioning) {
          handleTransition(newIndex);
        }
      }
    });
    return () => trigger.kill();
  }, [textures, scrollContainer]);

  const handleTransition = (index) => {
    state.current.isTransitioning = true;
    const mat = meshRef.current.material;
    mat.uniforms.u_texture1.value = textures[index];
    mat.uniforms.u_texRes1.value.set(textures[index].image.width, textures[index].image.height);

    gsap.to(mat.uniforms.u_progress, {
      value: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        mat.uniforms.u_texture0.value = textures[index];
        mat.uniforms.u_texRes0.value.set(textures[index].image.width, textures[index].image.height);
        mat.uniforms.u_progress.value = 0;
        state.current.currentIndex = index;
        state.current.isTransitioning = false;
      }
    });
  };

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[size.width, size.height]} />
      <shaderMaterial
        vertexShader={vertexShader2}
        fragmentShader={fragmentShader2}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};