

let gameModule = null

export function setCurrentGame(module) {
  gameModule = module
}

export function getPlayer() {
  return gameModule?.player ?? null
}

export function getKeys() {
  return gameModule?.keys ?? null
}

export function resetTime() {
  gameModule?.setLastTime(performance.now())
}