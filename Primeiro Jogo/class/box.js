class Box {
  constructor({ position, velocity, color }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.width = 20
    this.height = 300

    this.overlay = {
      opacity: 1
    }

    this.numero = 0
    this.radius = 30
  }
  draw() {

    this.numero += 1
    if (this.numero === 360) this.numero = 0

    // REFERENCIA PARA O TRANSLATE
    // ctx.fillStyle = "red"
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.save()
    ctx.globalAlpha = this.overlay.opacity
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(0 * Math.PI / 180)

    ctx.fillStyle = "green"
    ctx.fillRect(0 / 2, 0 / 2, this.width, this.height)

    ctx.restore()

    // ctx.save()
    // ctx.beginPath()
    // ctx.translate(this.position.x, this.position.y)
    // ctx.rotate(0 * Math.PI / 180)
    // ctx.fillStyle = this.color
    // ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false)
    // ctx.fill()
    // ctx.restore()

    // ctx.save()
    // ctx.translate(this.position.x, this.position.y)
    // ctx.rotate(0 * Math.PI / 180)
    // ctx.fillStyle = this.color
    // ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height)

    // ctx.save()
    // ctx.translate(0 - 10 - 90, 0)
    // ctx.rotate(this.numero * Math.PI / 180)
    // ctx.fillStyle = "yellow"
    // ctx.fillRect(0 - 10, 0 - 10, 20, 20)
    // ctx.restore()


    // ctx.fillStyle = "red"
    // ctx.fillRect(0 - 10 + 90, 0 - 10, 20, 20)


    // ctx.fillStyle = "black"
    // ctx.fillRect(0 - 10, 0 - 10 + 90, 20, 20)


    // ctx.fillStyle = "blue"
    // ctx.fillRect(0 - 10, 0 - 10 - 90, 20, 20)

    ctx.restore()
  }
  update() {

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()


    // this.velocity.y = 0
    // this.velocity.x = 0
    // if (keys.ArrowUp.pressed) {
    //   this.velocity.y = -3
    // } else if (keys.ArrowDown.pressed) {
    //   this.velocity.y = 3
    // } else if (keys.ArrowLeft.pressed) {
    //   this.velocity.x = -3
    // } else if (keys.ArrowRight.pressed) {
    //   this.velocity.x = 3
    // }
  }
}