class Enemy {
  constructor({ position, velocity, color }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.width = 100
    this.height = 100
    this.number = 0

    this.gravity = 0.8
    this.alsa = -10
  }
  draw() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.draw()
    // this.gravi()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  gravi() {

    let dy = this.position.y - enemy.position.y
    let dx = this.position.x - enemy.position.x
    let dist = Math.floor(Math.hypot(dx, dy))

    console.log(dist)

    // if (this.position.x + this.radius > enemy.position.x - enemy.radius) {
    //   console.log("Colision")
    // }


    if (keys.ArrowLeft.pressed) {
      player.velocity.x = -5
    } else if (keys.ArrowRight.pressed) {
      player.velocity.x = 5
    } else {
      player.velocity.x = 0
    }


    if (this.position.x + this.radius > enemy.position.x - enemy.radius) {

    }


    if (this.position.y + this.radius > canvas.height) {

      this.velocity.y = this.alsa
      this.alsa += 2
      if (this.alsa > 0) {
        this.velocity.y = 0
      }

    } else {
      this.velocity.y += this.gravity
    }
  }
}

