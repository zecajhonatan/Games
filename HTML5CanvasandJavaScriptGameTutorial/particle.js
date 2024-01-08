class Particle {
  constructor({ position, velocity, radius, color, alpha }) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.alpha = alpha
    this.friction = 0.99
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
  }

  update() {
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
    this.alpha -= 0.01
  }
}