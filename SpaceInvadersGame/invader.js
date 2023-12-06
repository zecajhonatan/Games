class Invader {
  constructor({ position }) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 0
    }

    this.opacity = 1
    this.scale = 1.2

    this.image = new Image()
    this.image.src = './img/invader.png'
    this.image.onload = () => {

      this.position = {
        x: position.x,
        y: position.y,
      }
      this.width = this.image.width * this.scale
      this.height = this.image.height * this.scale
    }
  }

  draw() {

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update({ velocity }) {
    if (this.image) {
      ctx.save()
      ctx.globalAlpha = this.opacity
      this.draw()
      ctx.restore()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }

  shoot(InvaderProjectiles) {
    InvaderProjectiles.push(new invaderProjectile({
      position: {
        x: this.position.x + this.width / 2,
        y: this.position.y + this.height
      },
      velocity: {
        x: 0,
        y: 8
      }
    }))
  }
}
