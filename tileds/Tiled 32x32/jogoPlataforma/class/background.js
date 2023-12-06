class Background {
  constructor({ position, velocity, image, speedX, speedY }) {
    this.position = position
    this.velocity = velocity
    this.image = new Image()
    this.image.src = image
    this.image.onload = () => {
      this.width = this.image.width
      this.height = this.image.height
    }
    this.gamespeedX = speedX
    this.gamespeedY = speedY
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.position.x += this.velocity.x * this.gamespeedX
    this.position.y += this.velocity.y * this.gamespeedY
    this.draw()
  }
}

let background = new Background({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 5,
    y: 5,
  },
  image: "./img/backgrounds/background.png",
  speedX: 0,
  speedY: 0,
})




