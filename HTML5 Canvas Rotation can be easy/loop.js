const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let numberOfParticles = 5
let particlesArray = []
const pumpkin = new Image()
pumpkin.src = "./img/pumpkins.png"

class Particles {
  constructor() {
    this.x = Math.random() * canvas.width // NUMEROS ALEATORIOS ENTRE 0 E A LARGURA DA TELA
    this.y = Math.random() * canvas.height // NUMEROS ALEATORIOS ENTRE 0 E ALTURA DA TELA
    this.size = Math.random() * 20 + 50 // NUMEROS ALEATORIOS ENTRE 50 E 150
    this.speed = Math.random() * 2 + 0.5 // NUMEROS ALEATORIOS ENTRE 1 E 4
    this.angle = Math.random() * 360 // NUMEROS ALEATORIOS ENTRE 0 E 360
    this.spin = Math.random() < 0.5 ? -1 : 1 // OPERADOR TERNARIO
    
    this.ix = Math.floor(Math.random() * 2)
    this.iy = Math.floor(Math.random() * 2)
    this.spriteSize = 300
  }
  draw() {

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle * Math.PI / 360 * this.spin)
    ctx.drawImage(pumpkin, this.spriteSize * this.ix, this.spriteSize * this.iy, this.spriteSize, this.spriteSize, 0 - this.size / 2, 0 - this.size / 2, this.size, this.size)
    ctx.restore()

  }
  update() {

    this.angle += 10
    if (this.y - this.size > canvas.height) {
      this.y = 0 - this.size
      this.x = Math.random() * canvas.width
      this.size = Math.random() * 20 + 50
      this.speed = Math.random() * 2 + 0.5

      this.ix = Math.floor(Math.random() * 2)
      this.iy = Math.floor(Math.random() * 2)

    }
    this.y += this.speed
  }
}

function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(
      new Particles()
    )
  }
}
init()

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw()
    particlesArray[i].update()
  }

  requestAnimationFrame(animate)
}
animate()
