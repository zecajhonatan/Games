var gravity = 0.7
class Monster {
  constructor({ position, velocity, animation, image, frameRate, frameLeft, currentFrameLeft, frameBuffer }) {
    this.position = position
    this.velocity = velocity
    this.animation = animation
    this.frameRate = frameRate
    this.frameLeft = frameLeft
    this.currentFrameLeft = currentFrameLeft
    this.frameBuffer = frameBuffer
    this.elapsedFrame = 0
    this.um = 1

    this.currentFrame = 0
    this.speed = 8
    this.scale = 1.2
    this.lastPosition
    this.lastKeyPressed
    this.onGround
    this.golpepassaro = false
    this.attackMonstro = false
    this.attackButton = false
    this.isAttack
    this.teste = 300
    this.somar = 300

    this.life = 200

    this.opcoesCurrentFrame
    this.hit = new Audio("./audios/hurt.ogg")

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 60 * this.scale,
      height: 90 * this.scale,
    }

    this.hitattack = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 130 * this.scale,
      height: 30 * this.scale,
      offset: 0,
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
    this.frameBuffer = this.animation[name].frameBuffer
    this.width = this.image.width / this.frameRate
    this.height = this.image.height
  }

  draw() {
    this.hitbox.position.x = this.position.x + 98
    this.hitbox.position.y = this.position.y + 62

    this.hitattack.position.x = this.hitbox.position.x - this.hitattack.offset
    this.hitattack.position.y = this.hitbox.position.y + 30


    ctx.fillStyle = "rgba(0,255,0, 0.0)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.fillStyle = "rgba(255,255,0, 0.0)"
    ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

    if (this.isAttack) {
      ctx.fillStyle = "rgba(255,0,0, 0.0)"
      ctx.fillRect(this.hitattack.position.x, this.hitattack.position.y, this.hitattack.width, this.hitattack.height)
    }
    //NUMERO EM CIMA DO JOGADOR
    ctx.fillStyle = "rgba(0,0,0, 1)"
    ctx.font = "25px serif";
    ctx.fillText("100", this.position.x + 115, this.position.y + 60)

    ctx.drawImage(
      this.image,
      this.width * this.currentFrame, /* this.frameLeft */ /* this.lastPosition == 'left' ? this.frameLeft : this.currentFrame, */
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
    this.detectcollision()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.gravity()
    this.moviment()
    // this.checkfire()
    this.skeleton()
    this.collisionskeleton()


    if (this.attackMonstro) {
      if (this.lastPosition === "left") {
        monster.switchFrames("Attack2Left")
      } else if (this.lastPosition === "right") {
        monster.switchFrames("Attack2")
      }
      this.velocity.x = 0 // NÃO QUERO QUE O PERSONAGEM SE MOVA ENQUANTO EFETUA O GOLPE
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
        if (this.lastPosition === "left") {
          this.switchFrames("HitLeft")
        } else if (this.lastPosition === "right") {
          this.switchFrames("Hit")
        }
      }
    })
  }

  skeleton() {
    if (scrollOffset == this.somar) {
      for (let i = 0; i < 1; i++) {
        skeleto.push(
          new Skeleton({
            position: {
              x: 1024,
              y: 250
            },
            velocity: {
              x: 0,
              y: 0
            },
            Walk: {
              image: "./Skeleton/Walk.png",
              frameRate: 4,
              frameBuffer: 10,
            },
            WalkLeft: {
              image: "./Skeleton/WalkLeft.png",
              frameRate: 4,
              frameBuffer: 10,
            },
            Attack: {
              image: "./Skeleton/Attack.png",
              frameRate: 8,
              frameBuffer: 10,
            },
            AttackLeft: {
              image: "./Skeleton/AttackLeft.png",
              frameRate: 8,
              frameBuffer: 10,
            },
            Attack3: {
              image: "./Skeleton/Attack3.png",
              frameRate: 6,
              frameBuffer: 10,
            },
            Attack3Left: {
              image: "./Skeleton/Attack3Left.png",
              frameRate: 6,
              frameBuffer: 10,
            },
            TakeHit: {
              image: "./Skeleton/TakeHit.png",
              frameRate: 4,
              frameBuffer: 5,
            },
            TakeHitLeft: {
              image: "./Skeleton/TakeHitLeft.png",
              frameRate: 4,
              frameBuffer: 5,
            },
            Death: {
              image: "./Skeleton/Death.png",
              frameRate: 4,
              frameBuffer: 5,
            },
            DeathLeft: {
              image: "./Skeleton/DeathLeft.png",
              frameRate: 4,
              frameBuffer: 5,
            },
          }
        ))
        this.somar += 1200
      }
      this.somar += 250
    }
  }

  collisionskeleton() {
    skeleto.forEach((skeletos, index) => {
      if (
        monster.hitattack.position.x < skeletos.hitbox.position.x + skeletos.hitbox.width
        &&
        monster.hitattack.position.x + monster.hitattack.width > skeletos.hitbox.position.x
        &&
        monster.hitattack.position.y < skeletos.hitbox.position.y + skeletos.hitbox.height
        &&
        monster.hitattack.position.y + monster.hitattack.height > skeletos.hitbox.position.y
        &&
        monster.isAttack
      ) {
        if (monster.lastPosition == "right") {
          skeletos.switchFrames("TakeHitLeft")
        } else if (monster.lastPosition == "left") {
          skeletos.switchFrames("TakeHit")
        }
        this.currentLife++
        if (this.currentLife % 5 === 0) {
          skeletos.life -= 3
        }
      }
    })

    skeleto.forEach((skeletos, index) => {
      if (skeletos.life <= 3) {
        skeletos.stopAnimation = false
        setTimeout(() => {
          skeletos.switchFrames("Death")
        }, 1500)
        if (skeletos.life <= 3) {
          // setTimeout(() => {
          //   skeleto.splice(index, 1, )
          // }, 3000)
        }
      }
    })
  }

  detectcollision() {
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

      if (this.velocity.y == 0) {
        this.onGround = false
      } else if (this.velocity.y >= 0) {
        this.onGround = true
      }
    })
  }

  gravity() {
    if (this.position.y + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    }
  }

  moviment() {
    if ((keys.ArrowLeft.pressed && this.lastKeyPressed === "ArrowLeft" && this.hitbox.position.x > 100) || keys.ArrowLeft.pressed && scrollOffset === 0 && this.hitbox.position.x > 0) {
      this.velocity.x = -this.speed
      this.lastPosition = "left"
      this.switchFrames("RunLeft")
    } else if ((keys.ArrowRight.pressed && this.lastKeyPressed === "ArrowRight" && this.hitbox.position.x + this.hitbox.width < 600)) {
      this.velocity.x = this.speed
      this.lastPosition = "right"
      this.switchFrames("Run")
    } else {

      this.velocity.x = 0

      if (this.lastPosition == "left") {
        this.switchFrames("IdleLeft")
      } else {
        this.switchFrames("Idle")
      }

      if (keys.ArrowRight.pressed && scrollOffset <= 9500) {
        this.switchFrames("Run")
        scrollOffset += 5

        backgrounds.forEach(background => {
          background.position.x -= this.speed * .66
        })
        platforms.forEach((platform) => {
          platform.position.x -= this.speed
        })

        flyingEye.position.x -= this.speed

        skeleto.forEach((skeletons) => {
          skeletons.position.x -= this.speed
        })

        sword.forEach((swords) => {
          swords.position.x -= this.speed
        })

        coin.map((coins) => {
          coins.position.x -= this.speed
        })

        fogo.forEach((fogos) => {
          fogos.position.x -= this.speed
        })



      } else if (keys.ArrowLeft.pressed && scrollOffset > 0) {
        this.switchFrames("RunLeft")
        scrollOffset -= 5

        backgrounds.forEach(background => {
          background.position.x += this.speed * .66
        })

        platforms.forEach((platform) => {
          platform.position.x += this.speed
        })

        flyingEye.position.x += this.speed

        skeleto.forEach((skeletons) => {
          skeletons.position.x += this.speed
        })

        sword.forEach((swords) => {
          swords.position.x += this.speed
        })

        coin.map((coins) => {
          coins.position.x += this.speed
        })
        fogo.forEach((fogos) => {
          fogos.position.x += this.speed
        })

      }

      if (monster.position.y > canvas.height) {
        init()
      }
    }

    if (keys.ArrowDown.pressed && !keys.ArrowDown.loose && !this.attackButton) {

      if (this.lastPosition == "left") {
        this.hitattack.offset = 83
      } else {
        this.hitattack.offset = 0
      }

      this.velocity.x = 0
      this.Attack = true
      keys.ArrowRight.pressed = false
      keys.ArrowLeft.pressed = false

      this.isAttackk()

      keys.ArrowDown.loose = true
      this.attackButton = true
    }

    if (keys.ArrowUp.pressed && !this.onGround && !keys.ArrowUp.hold) {
      this.velocity.y = -12
      keys.ArrowUp.hold = true
      this.onGround = true
    }

    if (this.velocity.y < 0) {
      if (this.lastPosition === "left") {
        this.switchFrames("JumpLeft")
      } else {
        this.switchFrames("Jump")
      }
    } else if (this.velocity.y > 0.7) {
      if (this.lastPosition === "left") {
        this.switchFrames("FallLeft")
      } else {
        this.switchFrames("Fall")
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

  isAttackk() {
    setTimeout(() => {
      this.attackMonstro = true
      this.isAttack = true
      this.currentFrame = 0
    }, 0)
    setTimeout(() => {
      this.attackMonstro = false
      this.isAttack = false
      setTimeout(() => {
        this.attackButton = false
      }, 200)
    }, 800)
  }
}





