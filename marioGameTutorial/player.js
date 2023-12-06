var gravity = 0.7
class Player {
  constructor({ position, velocity, animation, image, frameRate }) {
    this.position = position
    this.velocity = velocity
    this.animation = animation
    this.frameRate = frameRate
    this.currentFrame = 0
    this.speed = 8
    this.scale = 0.3
    this.lastPosition
    this.lastKeyPressed
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
    // this.coins()
  }

  // coins() {
  //   if (scrollOffset < 500) this.teste = 500
  //   let aleatorio = Math.floor(Math.random() * 5) + 1
  //   if (scrollOffset == this.teste) {
  //     for (let i = 0; i < aleatorio; i++) {
  //       let soma = 60 * i
  //       coin.push(
  //         new Coin({ x: 1000 + soma, y: 390, image: "./Wizard/Coin.png", frameRate: 4, frameBuffer: 12 }),
  //       )
  //     }
  //     for (let i = 0; i < aleatorio; i++) {
  //       let soma = 60 * i
  //       coin.push(
  //         new Coin({ x: 1200 + soma, y: 290, image: "./Wizard/Coin1.png", frameRate: 4, frameBuffer: 12 }),
  //       )
  //     }
  //     this.teste += 500
  //   }
  //   coin.map((coins, index) => {
  //     if (
  //       this.hitbox.position.x + this.hitbox.width > coins.position.x &&
  //       this.hitbox.position.x < coins.position.x + coins.height &&
  //       this.hitbox.position.y + this.hitbox.width > coins.position.y
  //     ) {
  //       coin.splice(index, 1)
  //       console.log("Teste")
  //     }
  //   })
  // }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: this.width * this.scale,
      height: this.height * this.scale,
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
    if ((keys.ArrowLeft.pressed && this.lastKeyPressed === "ArrowLeft" && this.position.x > 100) || keys.ArrowLeft.pressed && scrollOffset === 0 && this.position.x > 0) {
      this.velocity.x = -this.speed
      this.lastPosition = "left"
      this.switchFrames("spriteRunLeft")
    } else if (keys.ArrowRight.pressed && this.lastKeyPressed === "ArrowRight" && this.position.x < 400) {
      this.velocity.x = this.speed
      this.lastPosition = "right"
      this.switchFrames("spriteRunRight")
    } else {

      this.velocity.x = 0

      if (this.lastPosition === "left") {
        this.switchFrames("spriteStandLeft")
      } else {
        this.switchFrames("spriteStandRight")
      }

      if (keys.ArrowRight.pressed) {
        this.switchFrames("spriteRunRight")
        scrollOffset += 5

        platforms.forEach((platform) => {
          platform.position.x -= this.speed
        })

        backgrounds.forEach(background => {
          background.position.x -= this.speed * .66
        })

      } else if (keys.ArrowLeft.pressed && scrollOffset > 0) {
        this.switchFrames("spriteRunLeft")
        scrollOffset -= 5
        platforms.forEach((platform) => {
          platform.position.x += this.speed
        })
        backgrounds.forEach(background => {
          background.position.x += this.speed * .66
        })

      }
      if (scrollOffset > 2000) {
        console.log("Win Gamer")
      }

      if (this.position.y > canvas.height) {
        init()
      }
    }
    if (keys.ArrowUp.pressed /* && !this.onGround*/ && !keys.ArrowUp.hold) {
      this.velocity.y = -15
      keys.ArrowUp.hold = true
    }
  }

  updateFrames() {
    if (this.currentFrame < this.frameRate - 1) {
      this.currentFrame++
    } else {
      this.currentFrame = 0
    }
  }

}





