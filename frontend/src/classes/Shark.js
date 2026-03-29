const GRAVITY = 580

export default class Shark {
  constructor({
    x,
    y,
    size = 64,
    patrolDistance = 200,
    speed = 80
  }) {

    /* ======================
       POSITION
    ====================== */

    this.startX = x
    this.x = x
    this.y = y

    this.width = size
    this.height = size

    this.speed = speed
    this.patrolDistance = patrolDistance
    this.direction = 1

    /* ======================
       MOVEMENT
    ====================== */

    this.velocity = {
      x: speed,
      y: 0,
    }

    /* ======================
       SPRITE
    ====================== */

    this.image = new Image()
    this.isLoaded = false

    
    this.frameCount = 8

    this.rows = 2

    this.row = 0

    this.frame = 0
    this.frameWidth = 0
    this.frameHeight = 0

    this.animationTimer = 0
    this.animationSpeed = 0.1

    this.image.onload = () => {
      this.isLoaded = true

      this.frameWidth =
        this.image.width / this.frameCount

      this.frameHeight =
        this.image.height / this.rows
    }

    this.image.src = './images/shark.png'

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

  update(dt) {
    if (!dt) return

    this.animate(dt)
    this.move(dt)

    this.hitbox.x = this.x
    this.hitbox.y = this.y
  }

  /* ======================
     PATROL MOVEMENT
  ====================== */

  move(dt) {

    this.x += this.speed * dt * this.direction

    const distance = this.x - this.startX

    if (Math.abs(distance) > this.patrolDistance) {
      this.direction *= -1
    }
  }

  /* ======================
     ANIMATION
  ====================== */

  animate(dt) {

    this.animationTimer += dt

    if (this.animationTimer > this.animationSpeed) {
      this.frame++

      if (this.frame >= this.frameCount)
        this.frame = 0

      this.animationTimer = 0
    }
  }

  /* ======================
     DRAW
  ====================== */

  draw(c) {
    if (!this.isLoaded) return

    const sx = this.frame * this.frameWidth
    const sy = this.row * this.frameHeight

    c.save()

    // flip selon direction
    if (this.direction < 0) {
      c.scale(-1, 1)

      c.drawImage(
        this.image,
        sx,
        sy,
        this.frameWidth,
        this.frameHeight,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      )
    } else {
      c.drawImage(
        this.image,
        sx,
        sy,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

    c.restore()

    // DEBUG HITBOX (active si besoin)
    // c.strokeRect(this.x, this.y, this.width, this.height)
  }
}