let hearts = 3
let listeners = []
let onGameOver = null
let onVictory = null
let timerInterval = null
let timeLeft = 180
let timerListeners = []

/* HEARTS */

export function getHearts() { return hearts }

export function damagePlayer(amount = 1) {
  if (hearts <= 0) return
  hearts -= amount
  if (hearts < 0) hearts = 0
  listeners.forEach(cb => cb(hearts))
  if (hearts === 0) {
    stopTimer()
    onGameOver?.()
  }
}

export function subscribe(callback) {
  listeners.push(callback)
}

/* TIMER */

export function getTimeLeft() { return timeLeft }

export function subscribeTimer(callback) {
  timerListeners.push(callback)
}

export function startTimer() {
  stopTimer()
  timeLeft = 180
  timerInterval = setInterval(() => {
    timeLeft -= 1
    timerListeners.forEach(cb => cb(timeLeft))
    if (timeLeft <= 0) {
      stopTimer()
      onVictory?.()
    }
  }, 1000)
}

export function stopTimer() {
  clearInterval(timerInterval)
  timerInterval = null
}

export function setGameCallbacks({ gameOver, victory }) {
  onGameOver = gameOver
  onVictory = victory
}

export function resetGame() {
  hearts = 3
  listeners = []
  timerListeners = []
  stopTimer()
  timeLeft = 180
}