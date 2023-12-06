class FlyingEye {
  constructor({ position, velocity, image, frameRate, frameBuffer = 10, scale = 1, animation }) {
    this.position = position
    this.velocity = velocity
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0
    this.currentFrame = 0
    this.scale = scale
    this.animation = animation

    this.isAttack = false
    this.lastKeyPressed

    this.angle = Math.random() * 5
    this.angleSpeed = Math.random() * 0.2

    this.hit = new Audio("./audios/hurt.ogg")

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 40 * this.scale,
      height: 30 * this.scale,
    }

    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width / this.frameRate
      this.height = this.image.height
    }

    if (this.animation) {
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
    this.hitbox.position.x = this.position.x + 90
    this.hitbox.position.y = this.position.y + 90

    ctx.fillStyle = "rgba(255,0,0,0.0)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(0,0,255,0.0)"
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
    this.position.y += this.velocity.y + Math.sin(this.angle)
    this.angle += this.angleSpeed
    this.updatehitbox()
    this.draw()
    this.flyingEyeMoviment()

  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 90,
        y: this.position.y + 90
      },
      width: 40 * this.scale,
      height: 30 * this.scale,
    }
  }

  flyingEyeMoviment() {

    if (monster.hitbox.position.x - 100 > this.hitbox.position.x + this.hitbox.width) {
      this.velocity.x = 3
      this.switchFrames("Flight")
      this.lastKeyPressed = "right"
    } else if (monster.hitbox.position.x + monster.hitbox.width + 100 < this.hitbox.position.x) {
      this.velocity.x = -3
      this.switchFrames("FlightLeft")
      this.lastKeyPressed = "left"
    } else if (monster.hitbox.position.y - 100 > this.hitbox.position.y + this.hitbox.height) {
      this.velocity.y = 3
    }

    if (
      this.hitbox.position.x + this.hitbox.width > monster.hitbox.position.x &&
      this.hitbox.position.x < monster.hitbox.position.x + monster.hitbox.width &&
      this.hitbox.position.y + this.hitbox.height > monster.hitbox.position.y &&
      this.hitbox.position.y < monster.hitbox.position.y + monster.hitbox.height
    ) {
      if (this.lastKeyPressed == "right") {
        monster.switchFrames("Hit")
      } else if (this.lastKeyPressed == "left") {
        monster.switchFrames("HitLeft")
      }
    }

    if (
      this.hitbox.position.x + this.hitbox.width > monster.hitbox.position.x - 50
      &&
      this.hitbox.position.x < monster.hitbox.position.x + this.hitbox.width + 50
      &&
      this.hitbox.position.y < monster.hitbox.position.y + monster.hitbox.height
      &&
      this.hitbox.position.y + this.hitbox.height > monster.hitbox.position.y
    ) {
      if (this.lastKeyPressed == "right") {
        this.switchFrames("Attack2")
      } else if (this.lastKeyPressed == "left") {
        this.switchFrames("Attack2Left")
      }
      setTimeout(() => {
        if (this.lastKeyPressed == "right") {
          this.switchFrames("Flight")
        } else if (this.lastKeyPressed == "left") {
          this.switchFrames("FlightLeft")
        }
      }, 800)
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
