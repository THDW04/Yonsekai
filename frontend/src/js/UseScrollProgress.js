import { useEffect, useRef } from "react"
import Lenis from "lenis"

export const useScrollProgress = (speed = 1) => {
    const scrollProgress = useRef(0)

    useEffect(() => {
        const lenis = new Lenis()

        lenis.on("scroll", ({ scroll }) => {
            const hero = document.querySelector("[data-hero]")
            const maxScroll = hero.offsetHeight - window.innerHeight

            const raw = (scroll / maxScroll) * speed
            const eased = 1 - Math.pow(1 - raw, 3)

            scrollProgress.current = Math.min(eased, 1.1)
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => lenis.destroy()
    }, [speed])

    return scrollProgress
}