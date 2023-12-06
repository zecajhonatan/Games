class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) {

    this.position = position
    this.scale = scale
    this.framesMax = framesMax

    this.framesCurrent = 0 // quadro atual
    this.framesElapsed = 0 // quadro decorrido
    this.framesHolp = 20 // velocidade da animação 
    
    this.offset = offset

    this.image = new Image()
    this.image.src = imageSrc

  }

  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++ // quadros decorridos
    if (this.framesElapsed % this.framesHolp === 0) { // velocidade dos quadros
      if (this.framesCurrent < this.framesMax - 1) { // maximo de quadros
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

// BACKGRAOUND
let background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: 'Recursos/background.png',
  scale: 1,
})


// CASA VENDAS
let shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  imageSrc: 'Recursos/shop.png',
  scale: 2.75,
  framesMax: 6
})