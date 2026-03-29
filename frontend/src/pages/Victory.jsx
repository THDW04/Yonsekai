import { useNavigate } from "react-router-dom"
import { resetGame } from '../../js/gameState.js'

const Victory = () => {
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
      <h1 style={{ fontSize: '4rem', margin: 0 }}>🏆 Victory !</h1>
      <p style={{ color: '#aaa' }}>Tu as survécu aux 3 minutes !</p>
      <button onClick={restart} style={{
        padding: '12px 32px', fontSize: '1.2rem',
        background: '#2ecc71', color: 'white',
        border: 'none', borderRadius: 8, cursor: 'pointer',
      }}>Rejouer</button>
    </div>
  )
}

export default 