let hearts = 3

const listeners = []

export function getHearts() {
  return hearts
}

export function damagePlayer(amount = 1) {

  hearts -= amount

  if (hearts < 0) hearts = 0

  listeners.forEach(cb => cb(hearts))
}

export function resetHearts() {
  hearts = 3
  listeners.forEach(cb => cb(hearts))
}

export function subscribe(callback) {
  listeners.push(callback)
}