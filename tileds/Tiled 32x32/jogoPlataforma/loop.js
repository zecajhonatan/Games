let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

let scrollOffSet = 0


let parsedCollisions
let collisionsBlocks

parsedCollisions = collisionLevel1.parse2D()
collisionsBlocks = parsedCollisions.createObjectsFrom2D()


let player = new Player({
  position: {
    x: 300,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: "./img/sprites/Archer/Idle.png",
  frameRate: 6,
  frameBuffer: 6,
  collisionsBlocks: collisionsBlocks,
})


let animation = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  background.update()
  

  collisionsBlocks.forEach((collision) => {
    collision.update()
    
  })

  player.update()











  requestAnimationFrame(animation)
}
animation()
