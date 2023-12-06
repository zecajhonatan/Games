class SwordSprite {
  constructor({ position, velocity, image, frameRate, frameBuffer = 10, scale = 2, animation }) {
    this.position = position
    this.velocity = velocity
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.scale = scale
    this.animation = animation

    this.elapsedFrame = 0
    this.currentFrame = 0

    this.lastPosition
    this.Attack = false
    this.isHitAttack = false

    this.somar = 500

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 30 * this.scale,
      height: 30 * this.scale
    }

    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }

    if (this.image) {
      for (let key in this.animation) {
        let image = new Image()
        image.src = this.animation[key].image
        this.animation[key].image = image
      }
    }
  }

  switchFrames(name) {
    if (this.image === this.animation[name].image) return
    this.image = this.animation[name].image
    this.frameRate = this.animation[name].frameRate
    this.width = this.image.width / this.frameRate
    this.height = this.image.height
  }

  draw() {
    this.hitbox.position.x = this.position.x + 50
    this.hitbox.position.y = this.position.y + 50

    ctx.fillStyle = "rgba(255,0,0, 0.5)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(0,255,0, 0.3)"
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
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }

  updateFrames() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    }
  }
}

let swordSprite = new SwordSprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0
  },
  scale: 1.3,
  image: "./Skeleton/Sword.png",
  frameRate: 3,
  frameBuffer: 10,
  animation: {
    SwordTransmitting: {
      image: "./Skeleton/SwordTransmitting.png",
      frameRate: 5,
      frameBuffer: 10,
      scale: 1.3,
    },
    SwordTransmittingLeft: {
      image: "./Skeleton/SwordTransmittingLeft.png",
      frameRate: 5,
      frameBuffer: 10,
      scale: 1.3,
    },
  }
})