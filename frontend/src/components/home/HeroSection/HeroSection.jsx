import { useMemo, useRef, useEffect} from 'react'
import { Canvas, useFrame,useThree  } from '@react-three/fiber'
import { useGLTF, Clouds, Cloud } from "@react-three/drei"
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { vertexShader, fragmentShader } from '../../../js/shaders'
import Lenis from 'lenis'
import styles from './HeroSection.module.css'

function Model(props) {
    const { scene } = useGLTF("/assets/mountain_and_river_scroll.glb");
    return <primitive object={scene} {...props} />;
}

function MovingClouds({ position }) {
    const ref = useRef()

    useFrame((state, delta) => {
        ref.current.position.x += delta * 0.7


        if (ref.current.position.x > 15) {
            ref.current.position.x = 5
        }
    })

    return (
        <Cloud ref={ref} position={position} volume={5} fade={100} color="red" speed={0.5} />
    )
}

const config = {
    spread: 0.5,
    speed :2
}

const TransitionPlane = ({ scrollProgress }) => {
  const { viewport } = useThree()
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColor: { value: new THREE.Color('#040412') },
    uSpread: { value: config.spread}
  }), [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uProgress.value = scrollProgress.current
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export const HeroSection = () => {
    const scrollProgress = useRef(0)
    useEffect(() => {
        const lenis = new Lenis()

        lenis.on('scroll', ({ scroll }) => {
            const heroHeight = document.querySelector(`.${styles.hero}`).offsetHeight
            const windowHeight = window.innerHeight
            const maxScroll = heroHeight - windowHeight

            scrollProgress.current = Math.min((scroll / maxScroll) * config.speed, 1.1)
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => lenis.destroy()
    }, [])

    return (
        <section className={styles.hero}>
            <div className={styles.mountainsContainer}>
                <Canvas flat camera={{ position: [10, 3, 20], rotation: [0, 0, 0] }} >

                    <Model scale={0.3} rotation={[0.001, -4.6, 0]} />

                    <Clouds material={THREE.MeshBasicMaterial}>
                        <MovingClouds position={[5, 2, 19]} />
                        <MovingClouds position={[3, 2, 10]} />
                    </Clouds>

                    <EffectComposer>
                        <Bloom luminanceThreshold={0.2} intensity={0.2} mipmapBlur />
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

            <div className={styles.heroContent}>
                <p>Traverser Yonsekai, c’est accepter de perdre ses repères. Ici, la ligne d’horizon s’efface pour laisser place à l’expérience brute des éléments.</p>
            </div>
        </section>
    )
}