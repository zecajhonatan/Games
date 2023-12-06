class Projectile {

  constructor({ position, velocity, }) {
    this.position = position
    this.velocity = velocity
    this.radius = 3
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, -50, Math.PI / 2)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

}

function projectile() {
  projectiles.push(
    new Projectile(
      {
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y
        },
        velocity: {
          x: 0,
          y: -15
        }
      }
    )
  )
  
}

let projectiles = []
