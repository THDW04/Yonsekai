import { useRef, useEffect } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useGLTF, Clouds } from "@react-three/drei"
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { MovingClouds } from "./MovingClouds"
import { TransitionPlane } from "./TransitionPlane"
import { useScrollProgress } from "../../../js/UseScrollProgress"

import styles from "./HeroSection.module.css"

const Model = (props) => {
    const { scene } = useGLTF("/assets/mountain_and_river_scroll.glb")
    return <primitive object={scene} {...props} />
}

useGLTF.preload("/assets/mountain_and_river_scroll.glb")

export const HeroSection = () => {
    const scrollProgress = useScrollProgress(2)
    const textRef = useRef();

    useEffect(() => {
        const textElements = textRef.current.querySelectorAll('p');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 30%",
                end: "bottom bottom",
                scrub: true,
            }
        });

        textElements.forEach(element => {
            const split = new SplitType(element, { types: 'words' });

            tl.from(split.words, {
                filter: "blur(5px)",
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.5")
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, []);

    return (
        <section data-hero className={styles.hero}>
            <div className={styles.mountainsContainer}>
                <Canvas flat camera={{ position: [10, 3, 20], rotation: [0, 0, 0] }}>

                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} />

                    <Model scale={0.3} rotation={[0.001, -4.6, 0]} />

                    <Clouds material={THREE.MeshStandardMaterial}>
                        <MovingClouds position={[3, 2, 19]} />
                        <MovingClouds position={[-5, 2, 19]} />
                        <MovingClouds position={[-10, 2, 19]} />
                    </Clouds>

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} intensity={0.4} mipmapBlur />
                        <Noise opacity={0.3} premultiply blendFunction={BlendFunction.OVERLAY} />
                    </EffectComposer>

                </Canvas>
            </div>

            <div className={styles.heroHeader}>
                <h1>Yonsekai</h1>
                <p>Le musée des quatre éléments.</p>
            </div>

            <div className={styles.canvaTransition}>
                <Canvas>
                    <TransitionPlane scrollProgress={scrollProgress} />
                </Canvas>
            </div>

            <div ref={textRef} className={styles.heroContent}>
                <p>À travers cette exposition, vous découvrirez la puissance brute des éléments, du sommet des cimes aux profondeurs de l’océan. Ici, le manga ne se lit pas : il se ressent.</p>
                <p>Une question demeure, lancinante : face à une nature incontrôlable, l’homme est-il encore maître de son destin ?</p>
                <p>Entre contemplation et vertige, laissez-vous ébranler par le regard des plus grands auteurs japonais. Parviendrez-vous à trouver votre propre réponse ? <br /> L'expérience commence ici.</p>
            </div>
        </section>
    )
}