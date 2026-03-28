import { useMemo, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { vertexShader, fragmentShader } from "../../../js/shaders"

const config = {
    spread: 0.5
}

export  const TransitionPlane = ({ scrollProgress }) => {
    const { viewport } = useThree()
    const meshRef = useRef()

    const uniforms = useMemo(() => ({
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor: { value: new THREE.Color("#040412") },
        uSpread: { value: config.spread }
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