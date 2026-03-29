import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GameAir } from "../components/Game/GameAir"
import { Footer } from "../components/footer/Footer.jsx"
import { Helmet } from "react-helmet-async"
import Hearts from '../components/game/Hearts.jsx'
import { setGameCallbacks, startTimer } from '../js/gameState.js'

 const Game = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setGameCallbacks({
      gameOver: () => navigate('/gameover'),
      victory:  () => navigate('/victory'),
    })
    startTimer()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Hearts />
      <GameAir />
    </div>
  )

}

export default Game;