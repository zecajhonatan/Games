class Planet {
  constructor(game) { // argumento
    this.game = game
    this.x = this.game.width * 0.5
    this.y = this.game.height * 0.5
    this.radius = 100
    this.image = document.getElementById("planet")
  }

  draw(ctx) { // argumento

    ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius)

    if (this.game.debug) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
}

class Player {
  constructor(game) {
    this.game = game
    this.x = this.game.width * 0.5
    this.y = this.game.height * 0.5
    this.radius = 40
    this.image = document.getElementById("player")
    this.aim
    this.angle = 0
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(this.image, - this.radius, - this.radius)

    if (this.game.debug) {
      ctx.beginPath()
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    ctx.restore()
  }

  update() {
    this.aim = this.game.calcAim(this.game.planet, this.game.mouse)
    this.x = this.game.planet.x + (this.game.planet.radius + this.radius) * this.aim[0]
    this.y = this.game.planet.y + (this.game.planet.radius + this.radius) * this.aim[1]
    this.angle = Math.atan2(this.aim[3], this.aim[2]);
  }
}

class Projectile {
  constructor(game) {
    this.game = game;
    this.x
    this.y
    this.radius = 20
    this.free = true
  }

  start() {
    this.free = false
  }
}

class Game {
  constructor(canvas) { // argumento
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height

    this.debug = false

    this.planet = new Planet(this)
    this.player = new Player(this)

    this.mouse = {
      x: 0,
      y: 0
    }

    window.addEventListener("mousemove", e => {
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY
    })

    window.addEventListener("keyup", (e) => {
      if (e.key === "d" || e.key === "D") this.debug = !this.debug
    })

  }

  render(ctx) {

    this.planet.draw(ctx)
    this.player.draw(ctx)
    this.player.update()

  }

  calcAim(a, b) { // REUTILIZAVEL
    let dx = a.x - b.x // DISTANCIA ENTRE 2 OBJETOS
    let dy = a.y - b.y
    let distance = Math.hypot(dx, dy)
    let aimX = dx / distance * -1
    let aimY = dy / distance * -1
    return [aimX, aimY, dx, dy]
  }

}


window.addEventListener("load", () => {
  let canvas = document.querySelector("canvas")
  let ctx = canvas.getContext("2d")

  canvas.width = 1000
  canvas.height = 600

  ctx.strokeStyle = "#fff"
  ctx.lineWidth = 1

  const game = new Game(canvas) // argumento

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.render(ctx)




    requestAnimationFrame(loop)

  }
  loop()




})







