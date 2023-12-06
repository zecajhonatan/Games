// COINS
class Coin {
  constructor({ x, y, image, frameRate, frameBuffer = 10, scale = 1 }) {
    this.position = { x, y }
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0
    this.currentFrame = 0
    this.scale = scale

    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }
  }

  draw() {

    this.updatehitbox()

    ctx.fillStyle = "rgba(0,255,0,0.5)"
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

    // ctx.fillStyle = "rgba(255,0,0,0.5)"
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

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
    this.updateFrames()
  }

  update() {
    this.draw()
  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 0,
        y: this.position.y + 0
      },
      width: this.width * this.scale,
      height: this.height * this.scale,
    }
  }

  updateFrames() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++
      }
      else {
        this.currentFrame = 0
      }
    }
  }
}

// FOGOS
class Fogo {
  constructor({ x, y, image, frameRate, frameBuffer = 10, scale = 10 }) {
    this.position = { x, y }
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0
    this.currentFrame = 0
    this.scale = scale

    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }
  }

  draw() {

    // ctx.fillStyle = "rgba(255,0,0,0.5)"
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(255,0,0,0.0)"
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
    this.updateFrames()
  }

  update() {
    this.updatehitbox()
    this.draw()
  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 0,
        y: this.position.y + 0
      },
      width: this.width * this.scale,
      height: this.height * this.scale,
    }
  }

  updateFrames() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++
      }
      else {
        this.currentFrame = 0
      }
    }
  }
}








