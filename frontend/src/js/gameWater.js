import Player from '../classes/Player.js'
import Flame from '../classes/Flame.js'
import CollisionBlock from '../classes/CollisionBlock.js'
import Platform from '../classes/Platform.js'

import { damagePlayer } from './gameState.js'
import { loadImage } from './utils.js'
import { setCurrentGame } from './currentGame.js'

import collisions from '../data/Water/collisions.js'
import l_BackgroundWater from '../data/Water/l_BackgroundWater.js'
import  l_CollitionWater from '../data/Water/l_CollitionWater.js'
import  l_PlatformWater from '../data/Water/l_PlatformWater.js'

import './eventListeners.js'

/* ======================================================
   VARIABLES GLOBAL GAME
====================================================== */

let canvas
let c

const dpr = window.devicePixelRatio || 1

const GAME_WIDTH = 800
const GAME_HEIGHT = 450

/* ======================================================
   MAP DATA
====================================================== */

const layersData = {
  l_BackgroundWater,
  l_PlatformWater,
  l_CollitionWater,
}

const tilesets = {
   l_BackgroundWater: { imageUrl: './images/70903868-2000-44ab-2c1a-42b09a61c500.png', tileSize: 16 },
 l_CollitionWater: { imageUrl: './images/70903868-2000-44ab-2c1a-42b09a61c500.png', tileSize: 16 },
 l_PlatformWater: { imageUrl: './images/34c414f9-c9b9-48cd-6d3d-56f5d5b94f00.png', tileSize: 16 },
}

/* ======================================================
   COLLISIONS
====================================================== */

const collisionBlocks = []
const platforms = []
const blockSize = 16

collisions.forEach((row, y) => {
  row.forEach((symbol, x) => {

    if (symbol === 1) {
      collisionBlocks.push(
        new CollisionBlock({
          x: x * blockSize,
          y: y * blockSize,
          size: blockSize,
        })
      )
    }

    if (symbol === 2) {
      platforms.push(
        new Platform({
          x: x * blockSize,
          y: y * blockSize,
          width: 16,
          height: 4,
        })
      )
    }
  })
})

/* ======================================================
   PLAYER
====================================================== */

export const player = new Player({
  x: 100,
  y: 100,
  size: 42,
  velocity: { x: 0, y: 0 },
})

/* ======================================================
   FLAMES (ENNEMIS)
====================================================== */

const flamesData = [
  { x: 150, y: 0 },
  { x: 430, y: 0 },
  { x: 570, y: 0 },
  { x: 740, y: 0 },
  { x: 940, y: 0 },
  { x: 1140, y: 0 },
  { x: 1440, y: 0 },
]

export const flames = flamesData.map(data =>
  new Flame({
    x: data.x,
    y: data.y,
    size: 62,
    velocity: { x: 0, y: 0 },
  })
)

/* ======================================================
   INPUTS
====================================================== */

export const keys = {
  arrowLeft: { pressed: false },
  arrowRight: { pressed: false },
  space: { pressed: false },
}

export let lastTime = performance.now()

export function setLastTime(value) {
  lastTime = value
}

/* ======================================================
   CAMERA
====================================================== */

const camera = { x: 0, y: 0 }

const SCROLL_POST_RIGHT = 500
const SCROLL_POST_TOP = 100
const SCROLL_POST_BOTTOM = 200

/* ======================================================
   RENDER MAP
====================================================== */

const renderLayer = (tilesData, tilesetImage, tileSize, context) => {

  const tilesPerRow = Math.ceil(tilesetImage.width / tileSize)

  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {

      if (symbol === 0) return

      const tileIndex = symbol - 1

      const srcX = (tileIndex % tilesPerRow) * tileSize
      const srcY = Math.floor(tileIndex / tilesPerRow) * tileSize

      context.drawImage(
        tilesetImage,
        srcX,
        srcY,
        tileSize,
        tileSize,
        x * 16,
        y * 16,
        16,
        16
      )
    })
  })
}

const renderStaticLayers = async () => {

  const offscreenCanvas = document.createElement('canvas')
  offscreenCanvas.width = canvas.width
  offscreenCanvas.height = canvas.height

  const offscreenContext = offscreenCanvas.getContext('2d')

  for (const [layerName, tilesData] of Object.entries(layersData)) {

    const tilesetInfo = tilesets[layerName]
    const tilesetImage = await loadImage(tilesetInfo.imageUrl)

    renderLayer(
      tilesData,
      tilesetImage,
      tilesetInfo.tileSize,
      offscreenContext
    )
  }

  return offscreenCanvas
}

/* ======================================================
   GAME LOOP
====================================================== */

function animate(backgroundCanvas) {
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  player.handleInput(keys)
  player.update(deltaTime, collisionBlocks, platforms)

  // On boucle sur chaque flamme pour l'update ET vérifier la collision
  flames.forEach(flame => {
    flame.update(deltaTime, collisionBlocks, platforms)

    // Détection de collision intégrée dans la boucle
    if (
      player.x < flame.x + flame.size &&
      player.x + player.size > flame.x &&
      player.y < flame.y + flame.size &&
      player.y + player.size > flame.y
    ) {
      damagePlayer() // Appelle la fonction de gameState.js
    }
  })


  // CAMERA
  if (player.x > SCROLL_POST_RIGHT)
    camera.x = player.x - SCROLL_POST_RIGHT

  if (player.y < SCROLL_POST_TOP && camera.y > 0)
    camera.y = SCROLL_POST_TOP - player.y

  if (player.y < SCROLL_POST_BOTTOM)
    camera.y = -(player.y - SCROLL_POST_BOTTOM)

  c.save()

  c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  c.translate(-camera.x, camera.y)

  c.drawImage(backgroundCanvas, 0, 0)

  player.draw(c)

  flames.forEach(flame => flame.draw(c))

  c.restore()

  requestAnimationFrame(() => animate(backgroundCanvas))
}

/* ======================================================
   START GAME
====================================================== */

async function startGame() {

  canvas = document.querySelector('canvas')

  if (!canvas) {
    console.error('Canvas introuvable')
    return
  }

  c = canvas.getContext('2d')

  canvas.width = GAME_WIDTH * dpr
  canvas.height = GAME_HEIGHT * dpr

  canvas.style.width = GAME_WIDTH + 'px'
  canvas.style.height = GAME_HEIGHT + 'px'

  c.scale(dpr, dpr)

  setCurrentGame({ player, keys, setLastTime })

  const backgroundCanvas = await renderStaticLayers()

  animate(backgroundCanvas)
}

/* ======================================================
   SAFE START
====================================================== */

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', startGame)
} else {
  startGame()
}