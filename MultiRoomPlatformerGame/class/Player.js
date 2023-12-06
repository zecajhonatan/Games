let gravity = 0.7

class Player extends Sprits {
  constructor({ collisionsBlocks = [], imageSrc, frameRate, animation, frameBuffer, autoplay, loop }) {

    super({ imageSrc, frameRate, animation, frameBuffer, autoplay, loop })
    this.position = {
      x: 200,
      y: 200
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.onground // NO CHAO
    this.lastKeyPressed // ULTIMA TECLA PRESSIONADA
    this.collisionsBlocks = collisionsBlocks // COLISÃO DE BLOCOS
  }

  update() {
    // DRAW
    this.draw()

    this.position.x += this.velocity.x
    //OBJETO HITBOX
    this.updatehitbox()
    // CHECK FOR HORIZONTAL COLLISION
    this.checkForHorizontalCollision()
    //GRAVITY
    this.gravity()
    //OBJETO HITBOX
    this.updatehitbox()
    // CHECK FOR VERTICAL COLLISION
    this.checkForVesticalCollision()
    // MOVIMENT
  }

  switchSprit(name) {
    if (this.image === this.animation[name].image) return
    this.currentFrame = 0
    this.image = this.animation[name].image
    this.frameRate = this.animation[name].frameRate
    this.frameBuffer = this.animation[name].frameBuffer
    this.loop = this.animation[name].loop
    this.currentAnimation = this.animation[name]
  }

  updatehitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 38,
        y: this.position.y + 30
      },
      width: 75,
      height: 60
    }
  }

  moviment(keys) {
    
    if (this.preventInput) return
    if (keys.ArrowLeft.pressed && this.lastKeyPressed === 'ArrowLeft') {
      this.velocity.x = -5
      this.switchSprit('runLeft')
      this.lastDirection = "left"
    } else if (keys.ArrowRight.pressed && this.lastKeyPressed === 'ArrowRight') {
      this.velocity.x = 5
      this.switchSprit('runRight')
      this.lastDirection = "right"
    } else {
      this.velocity.x = 0
      if (this.lastDirection === "left") {
        this.switchSprit('idleLeft')
      } else {
        this.switchSprit('idleRight')
      }
    }
    if (keys.ArrowUp.pressed && !keys.ArrowUp.hold) {
      this.jump()
      keys.ArrowUp.hold = true
    }
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      let collisionBlock = this.collisionsBlocks[i]
      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width
        &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x
        &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
        &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
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
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width
        &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x
        &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
        &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }

      if (Math.ceil(this.position.y + this.height + this.velocity.y >= collisionBlock.position.y)) {
        this.onground = true // ESTA NO CHÃO
      } else {
        this.onground = false // ESTA NO AR
      }
    }
  }
  gravity() {
    this.position.y += this.velocity.y
    this.velocity.y += gravity
  }

  jump() {
    if (!this.onground) return
    this.velocity.y = -10
  }
}



