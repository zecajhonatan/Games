let gravity = 0.5
class Player {
  constructor({ position, velocity, frameRate, frameBuffer, image, collisionsBlocks = [] }) {

    this.position = position
    this.velocity = velocity

    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.currentFrame = 0
    this.elapsedFrame = 0
    this.scale = 1

    this.speedBackground = 1.5

    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }

    this.hitbox = {
      position: {
        x: 0,
        y: 0,
      },
      width: 70 * this.scale,
      height: 90 * this.scale
    }

    this.collisionsBlocks = collisionsBlocks
  }

  draw() {
    this.hitbox.position.x = this.position.x + 20
    this.hitbox.position.y = this.position.y + 38

    ctx.fillStyle = "rgba(255,0, 0, 0.4)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(0,0, 255, 0.4)"
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

    ctx.drawImage(
      this.image,
      this.width * this.currentFrame,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width * this.scale,
      this.height * this.scale
    )
  }

  update() {
    this.position.x += this.velocity.x
    this.draw()

    this.updatehitbox()
    this.checkForHorizontalCollision()

    this.gravity()
    this.updatehitbox()
    this.checkForVesticalCollision()

    this.moviment()
    this.updateFrame()
  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: 0,
        y: 0,
      },
      width: 70 * this.scale,
      height: 90 * this.scale
    }
  }

  moviment() {
    if (keys.ArrowLeft.pressed && this.position.x > 100 /* || keys.ArrowLeft.pressed && scrollOffSet > 0 && this.position.x > 0 */) {
      this.velocity.x = -5


    } else if (keys.ArrowRight.pressed && this.position.x + this.width < 800) {
      this.velocity.x = 5

    } else {
      this.velocity.x = 0
      background.gamespeedX = 0
      this.collisionsBlocks.forEach((col) => {
        col.gamespeedX = 0
      })

      if (keys.ArrowLeft.pressed && scrollOffSet > 0) {
        scrollOffSet -= 5
        console.log(scrollOffSet)

        background.gamespeedX = this.speedBackground

        this.collisionsBlocks.forEach((col) => {
          col.gamespeedX = this.speedBackground
        })
      } else if (keys.ArrowRight.pressed && scrollOffSet < 1360) {
        scrollOffSet += 5
        console.log(scrollOffSet)

        background.gamespeedX = -this.speedBackground

        this.collisionsBlocks.forEach((col) => {
          col.gamespeedX = -this.speedBackground
        })
      }

    }

    if (keys.ArrowUp.pressed) {
      this.velocity.y = -15
    }
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      let collisionBlock = this.collisionsBlocks[i]
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width
        &&
        this.position.x + this.width >= collisionBlock.position.x
        &&
        this.position.y >= collisionBlock.position.y
        &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
        if (this.velocity.x > 0) {
          const offset = this.position.x - this.position.x + this.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
      }
    }
  }

  checkForVesticalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      let collisionBlock = this.collisionsBlocks[i]

      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width
        &&
        this.position.x + this.width >= collisionBlock.position.x
        &&
        this.position.y + this.height >= collisionBlock.position.y
        &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.position.y - this.position.y + this.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }

  gravity() {
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    } else {
      this.velocity.y = 0
    }
  }

  updateFrame() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      this.currentFrame < this.frameRate - 1 ? this.currentFrame++ : this.currentFrame = 0
    }
  }
}

