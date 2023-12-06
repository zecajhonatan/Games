const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

let shots = []

const player = new Player({
  position: {
    x: 150,
    y: 50
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: "#8A2BE2",
  radius: 30
})

const enemy = new Enemy({
  position: {
    x: 800,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: "#FF1493",
  radius: 50
})

const box = new Box({
  position: {
    x: canvas.width / 2,
    y: canvas.height - 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: "#000",
})


let plataform = new Plataform({
  position: {
    x: 100,
    y: 350,
  },
  velocity: {
    x: 0,
    y: 0,
  }
})

function detectCollision({ rect1, rect2 }) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#808080"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // player.update()
  enemy.update()
  box.update()


  plataform.update()

  shots.map((shot) => {
    shot.update()
  })

  requestAnimationFrame(animate)
}
animate()