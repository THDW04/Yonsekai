const GRAVITY = 580

export default class Flame {
  constructor({ x, y, size = 32 }) {
    this.x = x
    this.y = y

    this.width = size
    this.height = size

    this.velocity = { x: 0, y: 0 }
    this.isOnGround = false

    /* ======================
       SPRITE
    ====================== */

    this.image = new Image()
    this.isLoaded = false

    // animation
    this.frame = 0
    this.frameCount = 8 
    this.frameWidth = 0
    this.frameHeight = 0

    this.animationTimer = 0
    this.animationSpeed = 0.08

    this.image.onload = () => {
      this.isLoaded = true
      this.frameWidth = this.image.width / this.frameCount
      this.frameHeight = this.image.height
    }

    this.image.src = './images/flame.png'

    /* ======================
       HITBOX
    ====================== */

    this.hitbox = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }

  /* ======================
     UPDATE
  ====================== */

  update(deltaTime, collisionBlocks = [], platforms = []) {
    if (!deltaTime) return

    this.animate(deltaTime)

    this.applyGravity(deltaTime)

    this.updateVerticalPosition(deltaTime)

    this.checkVerticalCollisions(collisionBlocks)

    this.checkPlatformCollisions(platforms)
  }

  /* ======================
     ANIMATION
  ====================== */

  animate(dt) {
    this.animationTimer += dt

    if (this.animationTimer > this.animationSpeed) {
      this.frame++
      if (this.frame >= this.frameCount) this.frame = 0
      this.animationTimer = 0
    }
  }

  /* ======================
     DRAW
  ====================== */

  draw(c) {
    if (!this.isLoaded) return

    c.drawImage(
      this.image,
      this.frame * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /* ======================
     PHYSICS
  ====================== */

  applyGravity(dt) {
    this.velocity.y += GRAVITY * dt
  }

  updateVerticalPosition(dt) {
    this.y += this.velocity.y * dt
    this.hitbox.y = this.y
  }

  /* ======================
     COLLISIONS
  ====================== */

  checkVerticalCollisions(blocks) {
    const buffer = 0.001

    for (const block of blocks) {
      if (
        this.hitbox.x < block.x + block.width &&
        this.hitbox.x + this.hitbox.width > block.x &&
        this.hitbox.y < block.y + block.height &&
        this.hitbox.y + this.hitbox.height > block.y
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.isOnGround = true

          this.hitbox.y = block.y - this.hitbox.height - buffer
          this.y = this.hitbox.y
        }
      }
    }
  }

  checkPlatformCollisions(platforms) {
    for (const platform of platforms) {
      if (platform.checkCollision(this)) {
        this.velocity.y = 0
        this.isOnGround = true
        this.y = platform.y - this.height
        return
      }
    }

    this.isOnGround = false
  }
}