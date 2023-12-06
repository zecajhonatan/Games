const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576
const explosions = []
const canvasPosition = canvas.getBoundingClientRect()

class Explosion {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.currentFrame = 0
    this.frameRate = 5
    this.frameBuffer = 10
    this.elapsedFrame = 0
    this.scale = 0.5


    this.image = new Image()
    this.image.src = "./img/boom.png"
    this.image.onload = () => {
      this.spriteWidth = this.image.width
      this.spriteHeight = this.image.height
      this.width = this.spriteWidth / 5
      console.log()
      this.height = this.spriteHeight
    }

    this.angle = Math.random() * 6.2
    this.sound = new Audio()
    this.sound.src = "./audio/04_Fire_explosion_04_medium.wav"

  }
  draw() {

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      this.width * this.currentFrame,
      0,
      this.width,
      this.height,
      0 - this.width / 2 * this.scale,
      0 - this.height / 2 * this.scale,
      this.width * this.scale,
      this.height * this.scale,
    )
    ctx.restore()

  }
  update() {
    if (this.currentFrame == 0) this.sound.play()
    this.elapsedFrame++
    if (this.elapsedFrame % this.frameBuffer === 0) {
      this.currentFrame++
    }
    if (this.currentFrame === 1000) this.currentFrame = 0
  }
}

window.document.addEventListener("click", (e) => {
  createAnimation(e)
})

// window.document.addEventListener("mousemove", (e) => {
//   createAnimation(e)
// })

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left
  let positionY = e.y - canvasPosition.top
  explosions.push(
    new Explosion(positionX, positionY)
  )

}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update()
    explosions[i].draw()
    if (explosions[i].currentFrame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }

  requestAnimationFrame(animation)
}
animation()


