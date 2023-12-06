class GenericObject {
  constructor({ x, y, imageSrc }) {
    this.position = { x, y }
    this.image = new Image()
    this.image.src = imageSrc
    this.image.onload = () => {
      this.width = this.image.width
      this.height = this.image.height
    }
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.draw()
  }
}