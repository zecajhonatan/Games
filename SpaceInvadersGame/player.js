class Player {
  constructor() {

    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 0
    this.lastkey
    this.opacity = 1

    const image = new Image()
    image.src = './img/spaceship.png'
    image.onload = () => {
      this.scale = 0.15
      this.image = image
      this.width = image.width * this.scale
      this.height = image.height * this.scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {

    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    )
    ctx.rotate(
      this.rotation
    )
    ctx.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    )
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
    ctx.restore()
  }

  update() {
    if (this.image) {
      this.draw()

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

    }

  }
}
let player = new Player()
