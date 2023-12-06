class CollisionBlock {
  constructor({ position, velocity, speedX, speedY }) {
    this.position = position
    this.velocity = velocity
    this.width = 32
    this.height = 32
    this.gamespeedX = speedX
    this.gamespeedY = speedY
  }
  draw() {
    ctx.fillStyle = "rgba(255, 0, 0, 0.1)"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.position.x += this.velocity.x * this.gamespeedX
    this.position.y += this.velocity.y * this.gamespeedY
    this.draw()
  }
}