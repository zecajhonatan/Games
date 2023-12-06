// https://www.youtube.com/watch?v=Mg7ibYWhjPI&t=1822s

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

let gameSpeed = 1.5

// IMAGE OF BACKGROUND
let layer1 = new Image()
layer1.src = "./img/layer-1.png"
let layer2 = new Image()
layer2.src = "./img/layer-2.png"
let layer3 = new Image()
layer3.src = "./img/layer-3.png"
let layer4 = new Image()
layer4.src = "./img/layer-4.png"
let layer5 = new Image()
layer5.src = "./img/layer-5.png"

class Layer {
  constructor(image, speedModifier) {
    this.x = 0
    this.y = -80
    this.width = 2400
    this.height = 720
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }

  update() {
    this.speed = gameSpeed * this.speedModifier

    if (this.x < -this.width) {
      this.x = 0
    }
    this.x = Math.floor(this.x - this.speed)
  }
}

let layer01 = new Layer(layer1, 0.2)
let layer02 = new Layer(layer2, 0.4)
let layer03 = new Layer(layer3, 0.6)
let layer04 = new Layer(layer4, 0.8)
let layer05 = new Layer(layer5, 1)

let object = [layer01, layer02, layer03, layer04, layer05]

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  object.forEach(objects => {
    objects.update()
    objects.draw()
  })

  requestAnimationFrame(animation)
}

animation()