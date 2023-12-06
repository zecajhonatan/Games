var gravity = 0.7
class EvilWizard {
  constructor({ position, velocity, animation, image, frameRate, frameBuffer = 0 }) {
    this.position = position
    this.velocity = velocity
    this.animation = animation
    this.frameRate = frameRate
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0

    this.currentFrame = 0
    this.speed = 8
    this.scale = 2
    this.lastKeyPressed

    this.Attack = false
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
    this.frameRate = this.animation[name].frameRate
    this.width = this.image.width / this.frameRate
    this.height = this.image.height
  }

  draw() {

    this.updatehitbox()
    this.detectcollisionvertical()

    // ctx.fillStyle = "rgba(0,255,0, 1)"
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    // ctx.fillStyle = "rgba(255,255,0, 1)"
    // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

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

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.gravity()
    this.moviment()
    this.coins()
    this.checkfire()
  }

  coins() {
    if (scrollOffset < 500) this.teste = 500
    let aleatorio = Math.floor(Math.random() * 5) + 1
    if (scrollOffset == this.teste) {
      for (let i = 0; i < aleatorio; i++) {
        let soma = 60 * i
        coin.push(
          new Coin({ x: 1000 + soma, y: 390, image: "./Wizard/Coin.png", frameRate: 4, frameBuffer: 12 }),
        )
      }
      for (let i = 0; i < aleatorio; i++) {
        let soma = 60 * i
        coin.push(
          new Coin({ x: 1200 + soma, y: 190, image: "./Wizard/Coin1.png", frameRate: 4, frameBuffer: 12 }),
        )
      }
      this.teste += 500
    }
    coin.map((coins, index) => {
      if (
        this.hitbox.position.x + this.hitbox.width > coins.position.x &&
        this.hitbox.position.x < coins.position.x + coins.width &&
        this.hitbox.position.y + this.hitbox.height > coins.position.y &&
        this.hitbox.position.y < coins.position.y + coins.height
      ) {
        coin.splice(index, 1)
        console.log("Teste Coins")
      }
    })
  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 105,
        y: this.position.y + 90
      },
      width: 40 * this.scale,
      height: 60 * this.scale,
    }
  }

  checkfire() {
    fogo.forEach((fogos) => {
      if (
        this.hitbox.position.x + this.hitbox.width > fogos.position.x &&
        this.hitbox.position.x < fogos.position.x + fogos.width &&
        this.hitbox.position.y + this.hitbox.height > fogos.position.y &&
        this.hitbox.position.y < fogos.position.y + fogos.height
      ) {
        console.log("Teste")
        this.switchFrames("TakeHit") 
      }
    })

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
    if ((keys.ArrowLeft.pressed /* && this.lastKeyPressed === "ArrowLeft" */ && this.hitbox.position.x > 100) || keys.ArrowLeft.pressed && scrollOffset === 0 && this.position.x > 0) {
      this.velocity.x = -this.speed
      this.lastPosition === "left"
      this.switchFrames("Run")
    } else if (keys.ArrowRight.pressed /* && this.lastKeyPressed === "ArrowRight" */ && this.hitbox.position.x < 400) {
      this.velocity.x = this.speed
      this.lastPosition === "right"
      this.switchFrames("Run")
    } else {

      this.velocity.x = 0

      if (this.lastPosition === "left") {
        this.switchFrames("Idle")
      } else {
        this.switchFrames("Idle")
      }

      if (keys.ArrowRight.pressed) {
        this.switchFrames("Run")
        scrollOffset += 5

        platforms.forEach((platform) => {
          platform.position.x -= this.speed
        })
        fogo.forEach((fogos) => {
          fogos.position.x -= this.speed
        })
        coin.map((coin) => {
          coin.position.x -= this.speed
        })

        backgrounds.forEach(background => {
          background.position.x -= this.speed * .66
        })

      } else if (keys.ArrowLeft.pressed && scrollOffset > 0) {
        this.switchFrames("Run")
        scrollOffset -= 5
        platforms.forEach((platform) => {
          platform.position.x += this.speed
        })
        fogo.forEach((fogos) => {
          fogos.position.x += this.speed
        })
        coin.map((coin) => {
          coin.position.x += this.speed
        })
        backgrounds.forEach(background => {
          background.position.x += this.speed * .66
        })

      }
      // if (scrollOffset > 2000) {
      //   console.log("Win Gamer")
      // }

      if (this.position.y > canvas.height) {
        init()
      }
    }

    if (keys.ArrowDown.pressed) {
      keys.ArrowRight.pressed = false
      keys.ArrowLeft.pressed = false
      this.velocity.x = 0
      this.switchFrames("Idle")
    }

    if (keys.ArrowUp.pressed /* && !this.onGround*/ && !keys.ArrowUp.hold) {
      this.velocity.y = -15
      keys.ArrowUp.hold = true
    }

    if (this.velocity.y < 0) {
      if (this.lastPosition === "left") {
        this.switchFrames("Idle")
      } else {
        this.switchFrames("Idle")
      }
    } else if (this.velocity.y > 0.7) {
      if (this.lastPosition === "left") {
        this.switchFrames("Idle")
      } else {
        this.switchFrames("Idle")
      }
    }
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





