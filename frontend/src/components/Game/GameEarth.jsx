import { useEffect, useRef } from "react"

export const GameEarth = ({ onVictory }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    import("../../js/gameEarth.js").then((module) => {
      if (module.startGame) {
        module.startGame({ canvas: canvasRef.current, onVictory })
      }
    })

    return () => {
      import("../../js/gameEarth.js").then((module) => {
        if (module.stopGame) module.stopGame()
      })
    }
  }, [])

  return <canvas ref={canvasRef} id="gameCanvas" />
}