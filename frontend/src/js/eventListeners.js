import { getPlayer, getKeys, resetTime } from './currentGame.js'

window.addEventListener('keydown', (e) => {
  const player = getPlayer()
  const keys   = getKeys()
  if (!player || !keys) return

  switch (e.key) {
    case ' ':
      player.jump()
      keys.space.pressed = true
      break
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = true
      break
  }
})

window.addEventListener('keyup', (e) => {
  const keys = getKeys()
  if (!keys) return

  switch (e.key) {
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = false
      break
  }
})

// Reset deltaTime quand on revient sur l'onglet
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) resetTime()
})