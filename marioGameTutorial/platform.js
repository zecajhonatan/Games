class Platform {
  constructor({ x, y, imageSrc }) {
    this.position = { x, y }
    
    this.image = new Image()
    this.image.src = imageSrc
    this.image.onload = () => {
      this.onloaded = true
      this.width = this.image.width
      this.height = this.image.height
    }
    this.onloaded = true
  }
  draw() {
    if (!this.onloaded) return 
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }
  update() {
    this.draw()
  }
}
