import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Cloud } from "@react-three/drei"

export const MovingClouds = ({ position }) => {
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.position.x += delta * 0.7
        if (ref.current.position.x > 25) { ref.current.position.x = 0 }
    })

    return (
        <Cloud
            ref={ref}
            position={position}
            volume={Math.random() * 5 + 2}
            opacity={0.6}
            fade={100}
            color="#dfe9f3"
            speed={0.7}
        />
    )
}