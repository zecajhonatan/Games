class Player {
  constructor({ position, velocity, color, radius }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.width = 50
    this.height = 50
    this.number = 0

    this.gravity = 0.5
    this.alsa = -6


  }
  draw() {

    ctx.fillStyle = "#000"
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

  }
  update() {
    this.draw()
    this.gravi()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  gravi() {

    // let dy = this.position.y - enemy.position.y
    // let dx = this.position.x - enemy.position.x
    // let dist = Math.floor(Math.hypot(dy, dx))

    // if (dist - this.radius - enemy.radius < 0){
    //   console.log("Colisão")
    // }


    if (keys.ArrowLeft.pressed) {
      player.velocity.x = -5
    } else if (keys.ArrowRight.pressed) {
      player.velocity.x = 5
    } else {
      player.velocity.x = 0
    }

    if (keys.ArrowUp.pressed) {
      this.velocity.y = -10
      this.alsa = -6
    }

    // if (keys.ArrowUp.pressed) {
    //   player.velocity.y = -5
    // } else if (keys.ArrowDown.pressed) {
    //   player.velocity.y = 5
    // } else {
    //   player.velocity.y = 0
    // }


    if (
      this.position.y + this.height + this.velocity.y < canvas.height
    ) {
      this.velocity.y += this.gravity
    } else {
      this.velocity.y = 0
    }


    // if (collision({ rect1: this, rect2: box })) console.log("teste");

    // =================================================================


    // COLISÃO X
    // if (
    //   this.position.y < box.position.y + box.height
    //   &&
    //   this.position.y + this.height > box.position.y
    //   &&
    //   this.position.x + this.width + this.velocity.x > box.position.x
    //   &&
    //   this.position.x + this.velocity.x < box.position.x + box.width
    // ) {
    //   this.velocity.x = 0
    // }

  }
}

function collision({
  rect1, rect2
}) {
  return (
    rect1.position.x < rect2.position.x + rect2.width &&
    rect1.position.x + rect1.width > rect2.position.x &&
    rect1.position.y < rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height > rect2.position.y
  )
}

