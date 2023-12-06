class invaderProjectile {
  constructor({ position, velocity, }) {
    this.position = position
    this.velocity = velocity
    this.width = 1.5
    this.height = 17
    this.opacity = 1
  }

  draw() {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    
    ctx.save()
    ctx.globalAlpha = this.opacity
    this.draw()
    ctx.restore()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
let InvaderProjectiles = []








