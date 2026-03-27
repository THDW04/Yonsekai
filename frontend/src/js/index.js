import Player from '../classes/Player.js'
import CollisionBlock from '../classes/CollisionBlock.js'
import Platform from '../classes/Platform.js'

import { loadImage } from './utils.js'

import collisions from '../data/collisions.js'
import l_New_Layer_1 from '../data/l_New_Layer_1.js'
import l_New_Layer_3 from '../data/l_New_Layer_3.js'
import l_New_Layer_4 from '../data/l_New_Layer_4.js'

import './eventListeners.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

canvas.width = 1024 * dpr
canvas.height = 576 * dpr

const layersData = {
  l_New_Layer_1: l_New_Layer_1,
  l_New_Layer_4: l_New_Layer_4,
  l_New_Layer_3: l_New_Layer_3,
}

const tilesets = {
  l_New_Layer_1: { imageUrl: './images/3c471563-e376-40e2-8796-a9300ce6a600.png', tileSize: 16 },
  l_New_Layer_4: { imageUrl: './images/802ce508-7dfd-4e07-d205-b7b22ab0cd00.png', tileSize: 16 },
  l_New_Layer_3: { imageUrl: './images/802ce508-7dfd-4e07-d205-b7b22ab0cd00.png', tileSize: 16 },
}

// Tile setup
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
    } else if (symbol === 2) {
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

const renderLayer = (tilesData, tilesetImage, tileSize, context) => {
  const tilesPerRow = Math.ceil(tilesetImage.width / tileSize)

  tilesData.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol !== 0) {
        const tileIndex = symbol - 1
        const srcX = (tileIndex % tilesPerRow) * tileSize
        const srcY = Math.floor(tileIndex / tilesPerRow) * tileSize

        context.drawImage(
          tilesetImage,
          srcX, srcY,
          tileSize, tileSize,
          x * 16, y * 16,
          16, 16
        )
      }
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
    if (tilesetInfo) {
      try {
        const tilesetImage = await loadImage(tilesetInfo.imageUrl)
        renderLayer(tilesData, tilesetImage, tilesetInfo.tileSize, offscreenContext)
      } catch (error) {
        console.error(`Failed to load image for layer ${layerName}:`, error)
      }
    }
  }

  return offscreenCanvas
}

// Change xy coordinates to move player's default position
export const player = new Player({
  x: 100,
  y: 100,
  size: 42,
  velocity: { x: 0, y: 0 },
})

export const keys = {
  arrowLeft: { pressed: false },
  arrowRight: { pressed: false },
  space: { pressed: false },
}

export let lastTime = performance.now()

export function setLastTime(value) {
  lastTime = value
}

const camera = { x: 0, y: 0 }

const SCROLL_POST_RIGHT = 500
const SCROLL_POST_TOP = 100
const SCROLL_POST_BOTTOM = 200

function animate(backgroundCanvas) {
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  player.handleInput(keys)
  player.update(deltaTime, collisionBlocks, platforms)

  if (player.x > SCROLL_POST_RIGHT) {
    camera.x = player.x - SCROLL_POST_RIGHT
  }

  if (player.y < SCROLL_POST_TOP && camera.y > 0) {
    camera.y = SCROLL_POST_TOP - player.y
  }

  if (player.y < SCROLL_POST_BOTTOM) {
    camera.y = -(player.y - SCROLL_POST_BOTTOM)
  }

  c.save()
  c.scale(dpr, dpr)
  c.translate(-camera.x, camera.y)
  c.clearRect(0, 0, canvas.width, canvas.height)
  c.drawImage(backgroundCanvas, 0, 0)
  player.draw(c)
  c.restore()

  requestAnimationFrame(() => animate(backgroundCanvas))
}

const startRendering = async () => {
  try {
    const backgroundCanvas = await renderStaticLayers()
    if (!backgroundCanvas) {
      console.error('Failed to create the background canvas')
      return
    }
    animate(backgroundCanvas)
  } catch (error) {
    console.error('Error during rendering:', error)
  }
}

startRendering()