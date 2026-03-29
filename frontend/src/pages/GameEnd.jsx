import { useNavigate } from "react-router-dom"
import { resetGame, startTimer, setGameCallbacks } from '../js/gameState.js'

 const GameEnd = () => {
  const navigate = useNavigate()

  const restart = () => {
    resetGame()
    navigate('/game')
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#1a1a1a',
      color: 'white', gap: 24,
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>💀 Game Over</h1>
      <p style={{ color: '#aaa' }}>Tu as perdu tous tes cœurs.</p>
      <button onClick={restart} style={{
        padding: '12px 32px', fontSize: '1.2rem',
        background: '#e74c3c', color: 'white',
        border: 'none', borderRadius: 8, cursor: 'pointer',
      }}>Recommencer</button>
    </div>
  )
}

export default GameEnd;




