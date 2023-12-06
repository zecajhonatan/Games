var gravity = 0.7
class Enemy {
  constructor({ position, velocity, animation, image, frameRate, frameLeft, currentFrameLeft, frameBuffer = 10 }) {
    this.position = position
    this.velocity = velocity
    this.animation = animation
    this.frameRate = frameRate
    this.frameLeft = frameLeft
    this.currentFrameLeft = currentFrameLeft
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0
    this.currentFrame = 0
    this.speed = 7
    this.scale = 1.9
    this.lastPosition
    this.lastKeyPressed

    this.golpe = false
    this.teste = 500


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
    // console.log(this.image)
    this.frameRate = this.animation[name].frameRate
    // console.log(this.frameRate)
    this.frameLeft = this.animation[name].frameLeft
    // console.log(this.frameLeft)
    this.currentFrameLeft = this.animation[name].currentFrameLeft
    // console.log(this.currentFrameLeft)
    this.frameBuffer = this.animation[name].frameBuffer
    // console.log(this.frameBuffer)
    this.width = this.image.width / this.frameRate
    // console.log(this.width)
    this.height = this.image.height
    console.log(this.height)
  }

  draw() {

    this.updatehitbox()
    this.detectcollisionvertical()
    this.updateFrames()

    ctx.fillStyle = "rgba(0,255,0, 0)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(255,255,0, 0)"
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)


    ctx.drawImage(
      this.image,
      this.width * this.currentFrame, /* this.frameLeft, */
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width * this.scale,
      this.height * this.scale
    )

    this.updateFramesLeft()
    this.updateFrames()
  }




  update() {

    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.gravity()
    this.moviment()
    this.coins()

  }



  coins() {

    if (scrollOffset < 500) this.teste = 500
    let aleatorio = Math.floor(Math.random() * 5) + 1

    if (scrollOffset == this.teste) {

      for (let i = 0; i < aleatorio; i++) {
        let soma = 60 * i
        coin.push(
          new Coin({ x: 1000, y: 10 + soma, image: "./Wizard/coin.png", frameRate: 4, frameBuffer: 12, scale: 1 }),
        )
      }
      for (let i = 0; i < aleatorio; i++) {
        let soma = 60 * i
        coin.push(
          new Coin({ x: 1200 + soma, y: 290, image: "./Wizard/coin1.png", frameRate: 4, frameBuffer: 12, scale: 1 }),
        )
      }
      this.teste += 500
    }


    coin.map((coins, index) => {
      if (
        coins.position.x > this.hitbox.position.x
        &&
        coins.position.x + coins.width < this.hitbox.position.x + this.hitbox.width
        &&
        coins.position.y > this.hitbox.position.y
        &&
        coins.position.y + coins.height < this.hitbox.position.y + this.hitbox.height
      ) {
        coin.splice(index, 1)
      }
    })


  }


  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 193,
        y: this.position.y + 127
      },
      width: 65 * this.scale,
      height: 100 * this.scale,
    }
  }

  detectcollisionvertical() {
    platforms.map((platform) => {
      if (this.hitbox.position.y + this.hitbox.height <= platform.position.y
        &&
        this.hitbox.position.y + this.hitbox.height + this.velocity.y >= platform.position.y
        &&
        this.hitbox.position.x + this.hitbox.width >= platform.position.x
        &&
        this.hitbox.position.x <= platform.position.x + platform.width
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          let offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = platform.position.y - offset - 0.01
        }
      }
    })
  }

  gravity() {
    if (this.position.y + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    }
  }

  moviment() {
    if ((keys.ArrowLeft.pressed && this.lastKeyPressed === "ArrowLeft" && this.hitbox.position.x > 100) || keys.ArrowLeft.pressed && scrollOffset === 0 && this.position.x > 0) {
      this.velocity.x = -this.speed
      this.lastPosition = "left"
      this.switchFrames("RunLeft")
    } else if (keys.ArrowRight.pressed && this.lastKeyPressed === "ArrowRight" && this.hitbox.position.x + this.hitbox.width < 800) {
      this.velocity.x = this.speed
      this.lastPosition = "right"
      this.switchFrames("Run")
    } else {
      this.switchFrames("Idle")
      this.velocity.x = 0

      if (this.lastPosition === "left") {
        this.switchFrames("IdleLeft")
      } else if (this.lastPosition === "right") {
        this.switchFrames("Idle")
      }
      if (keys.ArrowRight.pressed) {
        this.switchFrames("Run")
        scrollOffset += 5

        flyingEye.position.x -= this.speed

        platforms.forEach((platform) => {
          platform.position.x -= this.speed
        })

        coin.forEach((coins) => {
          coins.position.x -= this.speed
        })
        fogo.forEach((fogos) => {
          fogos.position.x -= this.speed
        })
        backgrounds.forEach(background => {
          background.position.x -= this.speed * .66
        })

      } else if (keys.ArrowLeft.pressed && scrollOffset > 0) {
        this.switchFrames("RunLeft")
        scrollOffset -= 5

        flyingEye.position.x += this.speed

        platforms.forEach((platform) => {
          platform.position.x += this.speed
        })
        coin.forEach((coins) => {
          coins.position.x += this.speed
        })
        fogo.forEach((fogos) => {
          fogos.position.x += this.speed
        })
        backgrounds.forEach(background => {
          background.position.x += this.speed * .66
        })
      }
      if (keys.ArrowDown.pressed) {
        this.golpe = true
        setTimeout(() => {
          this.golpe = false
        }, 800)
      }

      if (this.golpe) {
        if (this.lastPosition == "left") {
          this.switchFrames("Attack1Left")
        } else if (this.lastPosition == "right") {
          this.switchFrames("Attack1")
        }
      }
      // if (scrollOffset > 2000) {
      //   console.log("Win Gamer")
      // }

      if (this.hitbox.position.y > canvas.height) {
        init()
      }
    }

    if (this.velocity.y < 0) {
      if (this.lastPosition === "left") {
        this.switchFrames("JumpLeft")
      } else {
        this.switchFrames("Jump")
      }
    } else if (this.velocity.y > 0.8) {
      if (this.lastPosition === "left") {
        this.switchFrames("FallLeft")
      } else if (this.lastPosition === "right") {
        this.switchFrames("Fall")
      }
    }

    if (keys.ArrowUp.pressed /* && !this.onGround*/ && !keys.ArrowUp.hold) {
      this.velocity.y = -15

      keys.ArrowUp.hold = true
    }
  }

  updateFrames() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++
        // console.log(this.currentFrame)
      } else {
        this.currentFrame = 0
      }
    }
  }

  updateFramesLeft() {
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.frameLeft < this.currentFrameLeft + 1) {
        this.frameLeft--
        // console.log(this.frameLeft)
        if (this.frameLeft < 0) this.frameLeft = this.currentFrameLeft
      }

    }
  }

}




