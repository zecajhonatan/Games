class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }
    this.velocity = {
      x: 2,
      y: 0
    }

    this.invaders = []

    let columns = Math.floor(Math.random() * 10 + 5) // numeros de linhas aleatorios de 2 a 10   
    let rows = Math.floor(Math.random() * 5 + 2)

    for (let x = 0; x < columns; x++) { // colunas
      for (let y = 0; y < rows; y++) { // linhas
        this.invaders.push(new Invader({
          position: {
            x: x * 30,
            y: y * 30,
          }
        }))
      }
    }
    this.width = columns * 30
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.velocity.y = 0
    if (this.position.x + this.width >= 1024 || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = 30
    }
  }
}

let grids = []
