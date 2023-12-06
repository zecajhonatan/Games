let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 1024
canvasheight = 576


class Player {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.offset = {
      position: {
        x: this.position.x,
        y: this.position.y
      }
    }
    this.width = 200
    this.height = 200

    this.scale = 1.52
    this.gravitys = 0.5

    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHolp = 4
    this.frameMax = 8

    this.image = new Image()
    this.image.src = './idle.png'
  }

  draw() {

    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.drawImage(
      this.image,
      this.frameCurrent * this.width, // parametro para fazer o loop
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width * this.scale,
      this.height * this.scale)
  }

  animationFrame() {
    this.frameElapsed++
    if (this.frameElapsed % this.frameHolp === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }

  gravity() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height <= canvas.height) {

      console.log(this.position.y + this.height)

      this.velocity.y += 0.5
    } else {
      this.velocity.y = 0
    }
  }

  update() {
    this.gravity()
    this.draw()
    this.animationFrame()
  }


}
let player = new Player()


function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'yellow'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update()
  requestAnimationFrame(animation)
}
animation()
