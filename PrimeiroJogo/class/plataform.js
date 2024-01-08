
class Plataform {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 100

    this.dy
    this.dx
    this.angle

    this.teste = 0

    this.aleatorioX = Math.floor(Math.random() * 4 - 2)

    this.valX
    this.valY
    this.button

    this.numero = 3

    this.gravity = 0.8
  }
  draw() {
    ctx.fillStyle = "#f22"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update() {

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()

    if (keys.ArrowLeft.pressed) {
      this.velocity.x = -5
    } else if (keys.ArrowRight.pressed) {
      this.velocity.x = 5
    } else {
      this.velocity.x = 0
    }

    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity
    } else {
      this.velocity.y = 0
    }

    if (keys.ArrowUp.pressed) {
      this.velocity.y = -10
      this.alsa = -6
    }

    if (keys.b.pressed && !this.button) {
      this.button = true

      this.shots()
    }

    shots.forEach((shot, index) => {


      if (
        shot.position.x + shot.radius > box.position.x
        &&
        shot.position.x - shot.radius < box.position.x + box.width
        &&
        shot.position.y - shot.radius > box.position.y

      ) {
        setTimeout(() => {
          shots.splice(index, 1)
        }, 0)



      }

      if (shot.position.y < canvas.height) {
        shot.velocity.y += 0.5    // GRAVITY
      }

      if (shot.position.y + shot.radius + shot.velocity.y >= canvas.height) {

        shot.velocity.y = 0

        this.numero -= 0.5
        shot.velocity.x = 2 * this.numero

        if (this.numero <= 0) {
          shot.velocity.x = 0
        }
      }

    })






  }

  shots() {

    // this.dy = this.position.y - box.position.y + 12.5
    // this.dx = this.position.x - box.position.x + 12.5
    // this.angle = Math.atan2(this.dy, this.dx)
    // this.valX = Math.cos(this.angle) * 30
    // this.valY = Math.sin(this.angle) * 30

    shots.push(
      new Shot({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height / 2,
        },
        velocity: {
          x: 10,
          y: -14
        },
        radius: 5
      })
    )
  }
}

class Shot {
  constructor({ position, velocity, radius }) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
  }
  draw() {
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.fill()
  }
  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }
}

