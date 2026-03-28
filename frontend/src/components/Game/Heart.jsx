import { useEffect, useState } from 'react'
import { subscribe, getHearts } from '../../js/gameState.js'

export default function Hearts() {

  const [hearts, setHearts] = useState(getHearts())

  useEffect(() => {
    subscribe(setHearts)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      display: 'flex',
      gap: 8,
      zIndex: 999
    }}>
      {[...Array(3)].map((_, i) => (
        <span key={i} style={{
          fontSize: '32px',
          opacity: i < hearts ? 1 : 0.2
        }}>
          ❤️
        </span>
      ))}
    </div>
  )
}