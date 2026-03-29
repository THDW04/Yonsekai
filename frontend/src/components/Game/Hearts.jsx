import { useEffect, useState } from 'react'
import { subscribe, getHearts, subscribeTimer, getTimeLeft } from '../../js/gameState.js'

export default function Hearts() {
  const [hearts, setHearts]     = useState(getHearts())
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    subscribe(setHearts)
    subscribeTimer(setTimeLeft)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = String(timeLeft % 60).padStart(2, '0')

  return (
    <div style={{
      position: 'absolute', top: 20, left: 20,
      display: 'flex', flexDirection: 'column',
      gap: 8, zIndex: 999,
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {[...Array(3)].map((_, i) => (
          <span key={i} style={{ fontSize: '32px', opacity: i < hearts ? 1 : 0.2 }}>
            ❤️
          </span>
        ))}
      </div>
      <div style={{
        color: timeLeft <= 30 ? '#e74c3c' : 'white',
        fontSize: '1.2rem', fontWeight: 'bold',
        textShadow: '0 0 6px black',
      }}>
        ⏱ {minutes}:{seconds}
      </div>
    </div>
  )
}