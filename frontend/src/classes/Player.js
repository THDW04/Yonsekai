const X_VELOCITY = 200
const JUMP_POWER = 250
const GRAVITY = 580

export default class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size

    this.velocity = velocity
    this.isOnGround = false

    // ===== DOUBLE JUMP =====
    this.jumpCount = 0
    this.maxJumps = 3 

    // ===== IMAGE =====
    this.image = new Image()
    this.isImageLoaded = false
    this.image.onload = () => (this.isImageLoaded = true)
    this.image.src = './images/player.png'

    // ===== ANIMATION =====
    this.elapsedTime = 0
    this.currentFrame = 0

    this.animations = {
      idle: { x: 0, y: 0, w: 33, h: 32, frames: 1, fps: 0 },
      run: { x: 0, y: 32, w: 33, h: 32, frames: 2, fps: 8 },
      jump: { x: 64, y: 64, w: 33, h: 32, frames: 1, fps: 0 },
      fall: { x: 0, y: 96, w: 33, h: 32, frames: 1, fps: 0 },
      roll: { x: 0, y: 96, w: 33, h: 32, frames: 4, fps: 12 },
    }

    this.state = 'idle'
    this.currentAnimation = this.animations.idle

    this.facing = 'right'

    this.isRolling = false
    this.isInAirAfterRolling = false

    this.hitbox = {
      x: this.x + 4,
      y: this.y + 9,
      width: 20,
      height: 23,
    }
  }

  /* ===============================
     STATE MACHINE
  =============================== */

  setState(newState) {
    if (this.state === newState) return
    this.state = newState
    this.currentAnimation = this.animations[newState]
    this.currentFrame = 0
    this.elapsedTime = 0
  }

  updateState() {
    if (this.isRolling) return

    if (!this.isOnGround) {
      if (this.velocity.y < 0) return this.setState('jump')
      return this.setState('fall')
    }

    if (this.velocity.x !== 0) return this.setState('run')

    this.setState('idle')
  }

  /* ===============================
     UPDATE
  =============================== */

  update(deltaTime, collisionBlocks, platforms) {
    if (!deltaTime) return

    this.animate(deltaTime)
    this.applyGravity(deltaTime)

    this.updateHorizontalPosition(deltaTime)
    this.checkForHorizontalCollisions(collisionBlocks)

    this.checkPlatformCollisions(platforms, deltaTime)

    this.updateVerticalPosition(deltaTime)
    this.checkForVerticalCollisions(collisionBlocks)

    this.updateDirection()
    this.updateState()
  }

  animate(deltaTime) {
    const anim = this.currentAnimation

    if (anim.fps === 0) {
      this.currentFrame = 0
      return
    }

    this.elapsedTime += deltaTime
    const frameDuration = 1 / anim.fps

    if (this.elapsedTime >= frameDuration) {
      this.currentFrame = (this.currentFrame + 1) % anim.frames
      this.elapsedTime -= frameDuration

      if (this.state === 'roll' && this.currentFrame === 3) {
        this.isRolling = false
      }
    }
  }

  /* ===============================
     DRAW
  =============================== */

  draw(c) {
    if (!this.isImageLoaded) return

    let scaleX = 1
    let drawX = this.x

    if (this.facing === 'left') {
      scaleX = -1
      drawX = -this.x - this.width
    }

    const anim = this.currentAnimation

    c.save()
    c.scale(scaleX, 1)
    c.drawImage(
      this.image,
      anim.x + anim.w * this.currentFrame,
      anim.y,
      anim.w,
      anim.h,
      drawX,
      this.y,
      this.width,
      this.height
    )
    c.restore()
  }

  /* ===============================
     MOVEMENT
  =============================== */

  handleInput(keys) {
    if (this.isRolling || this.isInAirAfterRolling) return

    this.velocity.x = 0
    if (keys.arrowRight.pressed) this.velocity.x = X_VELOCITY
    if (keys.arrowLeft.pressed) this.velocity.x = -X_VELOCITY
  }

  // ===== DOUBLE JUMP =====
  jump() {
    if (this.jumpCount >= this.maxJumps) return

    this.velocity.y = -JUMP_POWER
    this.isOnGround = false
    this.jumpCount++
  }

  roll() {
    if (!this.isOnGround) return
    this.isRolling = true
    this.isInAirAfterRolling = true
    this.setState('roll')
    this.velocity.x = this.facing === 'right' ? 300 : -300
  }

  updateDirection() {
    if (this.velocity.x > 0) this.facing = 'right'
    if (this.velocity.x < 0) this.facing = 'left'
  }

  applyGravity(dt) {
    this.velocity.y += GRAVITY * dt
  }

  updateHorizontalPosition(dt) {
    this.x += this.velocity.x * dt
    this.hitbox.x = this.x + 4
  }

  updateVerticalPosition(dt) {
    this.y += this.velocity.y * dt
    this.hitbox.y = this.y + 9
  }

  /* ===============================
     COLLISIONS
  =============================== */

  checkForHorizontalCollisions(blocks) {
    const buffer = 0.0001

    for (const block of blocks) {
      if (
        this.hitbox.x < block.x + block.width &&
        this.hitbox.x + this.hitbox.width > block.x &&
        this.hitbox.y < block.y + block.height &&
        this.hitbox.y + this.hitbox.height > block.y
      ) {
        if (this.velocity.x > 0) {
          this.hitbox.x = block.x - this.hitbox.width - buffer
        } else if (this.velocity.x < 0) {
          this.hitbox.x = block.x + block.width + buffer
        }

        this.x = this.hitbox.x - 4
        this.velocity.x = 0
        this.isRolling = false
      }
    }
  }

  checkForVerticalCollisions(blocks) {
    const buffer = 0.0001

    for (const block of blocks) {
      if (
        this.hitbox.x < block.x + block.width &&
        this.hitbox.x + this.hitbox.width > block.x &&
        this.hitbox.y < block.y + block.height &&
        this.hitbox.y + this.hitbox.height > block.y
      ) {
        // Touch ground
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.isOnGround = true
          this.jumpCount = 0

          this.hitbox.y = block.y - this.hitbox.height - buffer
          this.y = this.hitbox.y - 9
          this.isInAirAfterRolling = false
        }

        // Hit ceiling
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.hitbox.y = block.y + block.height + buffer
          this.y = this.hitbox.y - 9
        }
      }
    }
  }

  checkPlatformCollisions(platforms, deltaTime) {
    const buffer = 0.0001

    for (const platform of platforms) {
      if (platform.checkCollision(this, deltaTime)) {
        this.velocity.y = 0
        this.isOnGround = true
        this.jumpCount = 0
        this.y = platform.y - this.height - buffer
        return
      }
    }

    this.isOnGround = false
  }
}