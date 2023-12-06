class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      offset: { x: 0, y: 0 },
      width: undefined,
      height: undefined
    } }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

    this.velocity = velocity
    this.color = color

    this.width = 50
    this.height = 150

    this.gravity = 0.6
    this.lastKey

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    }

    this.isAttacking
    this.health = 100

    this.framesCurrent = 0 // quadros atuais
    this.framesElapsed = 0 // quadros deccoridos
    this.framesHolp = 5 // segurar quadros
    this.sprites = sprites

    for (const sprite in this.sprites) { // 
      this.sprites[sprite].image = new Image()
      this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
    }

    this.onGround
  }

  update() {

    if (Math.ceil(this.position.y + this.image.height >= canvas.height - 97)) {
      this.onGround = true // player esta no chão
    } else {
      this.onGround = false // player não esta no chão
    }

    // ctx.fillStyle = 'green'
    // ctx.fillRect(this.position.x, this.position.y, player.width, player.height)

    this.draw()
    this.animateFrames()

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    if (this.isAttacking) {
      ctx.fillStyle = 'rgba(255,0,0,0.0)';
      ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.image.height + this.velocity.y >= canvas.height - 97) {
      this.velocity.y = 0
      this.position.y = 279
    } else {
      if (!this.onGround) this.velocity.y += this.gravity
    }

  }

  jump() {
    if (!this.onGround) return
    this.velocity.y -= 16
    console.log('go')
  }

  attack() {
    this.isAttacking = true
    this.swicthSprites('attack1')
  }

  swicthSprites(sprite) {
    if (this.image === this.sprites.Attack1.image && this.framesCurrent < this.sprites.Attack1.framesMax - 1) return
    switch (sprite) {
      case 'idle': // parado / ocioso 
        if (this.image !== this.sprites.Idle.image) {
          this.image = this.sprites.Idle.image
          this.framesMax = this.sprites.Idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run': // correr 
        if (this.image !== this.sprites.Run.image) {
          this.image = this.sprites.Run.image
          this.framesMax = this.sprites.Run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump': // pular 
        if (this.image !== this.sprites.Jump.image) {
          this.image = this.sprites.Jump.image
          this.framesMax = this.sprites.Jump.framesMax
          this.framesCurrent = 0
        }
        break
      case 'fall': // cair
        if (this.image !== this.sprites.Fall.image) {
          this.image = this.sprites.Fall.image
          this.framesMax = this.sprites.Fall.framesMax
          this.framesCurrent = 0
        }
        break
      case 'attack1': // ataque
        if (this.image !== this.sprites.Attack1.image) {
          this.image = this.sprites.Attack1.image
          this.framesMax = this.sprites.Attack1.framesMax
          this.framesCurrent = 0
        }
        break
    }
  }
}

let player = new Fighter({ // player ==> jogador
  position: {
    x: 200,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'red',
  imageSrc: 'Recursos/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 100
  },

  sprites: {
    Idle: { // parado / ocioso
      imageSrc: 'Recursos/samuraiMack/Idle.png',
      framesMax: 8,
    },
    Run: { //correr
      imageSrc: 'Recursos/samuraiMack/Run.png',
      framesMax: 8,
    },
    Jump: { //correr
      imageSrc: 'Recursos/samuraiMack/Jump.png',
      framesMax: 2,
    },
    Fall: { //correr
      imageSrc: 'Recursos/samuraiMack/Fall.png',
      framesMax: 2,
    },
    Attack1: { //correr
      imageSrc: 'Recursos/samuraiMack/Attack1.png',
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 50,
      y: 90
    },
    width: 200,
    height: 50
  }
})



let enemy = new Fighter({ // enemy ==> inimigo
  position: {
    x: 724,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue',
  imageSrc: 'Recursos/kenji/Idle.png',
  framesMax: 4,
  scale: 2.3,
  offset: {
    x: 215,
    y: 97
  },

  sprites: {
    Idle: { // parado / ocioso
      imageSrc: 'Recursos/kenji/Idle.png',
      framesMax: 4,
    },
    Run: { //correr
      imageSrc: 'Recursos/kenji/Run.png',
      framesMax: 8,
    },
    Jump: { //correr
      imageSrc: 'Recursos/kenji/Jump.png',
      framesMax: 2,
    },
    Fall: { //correr
      imageSrc: 'Recursos/kenji/Fall.png',
      framesMax: 2,
    },
    Attack1: { //correr
      imageSrc: 'Recursos/kenji/Attack1.png',
      framesMax: 4,
    },
  },
  attackBox: {
    offset: {
      x: -180,
      y: 90
    },
    width: 200,
    height: 50
  }
})