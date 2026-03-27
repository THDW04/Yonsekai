import { player, keys, setLastTime } from './index.js'

window.addEventListener('keydown', (event) => {
  switch (event.key) {
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

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false
      break
    case 'ArrowRight':
      keys.arrowRight.pressed = false
      break
  }
})

// On return to game's tab, ensure delta time is reset
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setLastTime(performance.now())
  }
})