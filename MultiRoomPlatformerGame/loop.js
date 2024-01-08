let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext("2d");

canvas.width = 1024 // largura 
canvas.height = 576 // altura

const overlay = {
  opacity: 0
}

let parsedCollisions
let collisionsBlocks
let background
let door

let player = new Player({
  
  imageSrc: "./img/img/king/idle.png",
  frameRate: 11,

  animation: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/img/king/enterDoor.png",
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++
            if (level === 4) level = 1
            levels[level].init()
            player.switchSprit('idleRight')
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0
            })
          }
        })
      }
    },
  }
})

let level = 1


let levels = {
  1: {
    init: () => {

      parsedCollisions = collisionsLevel1.parse2D() // colisoes analizadas
      collisionsBlocks = parsedCollisions.createObjectsFrom2D() // blocos de colisões
      player.collisionsBlocks = collisionsBlocks

      player.position.x = 170
      player.position.y = 340
      player.lastDirection = "right"

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprits({
        position: {
          x: 0,
          y: 0
        },
        imageSrc: "./img/img/backgroundLevel1.png"
      })

      door = [ //PORTA
        new Sprits({
          position: {
            x: 767,
            y: 270
          },
          imageSrc: "./img/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false
        })
      ]
    }
  },
  2: {
    init: () => {

      parsedCollisions = collisionsLevel2.parse2D()
      collisionsBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionsBlocks = collisionsBlocks

      player.position.x = 96
      player.position.y = 140

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprits({
        position: {
          x: 0,
          y: 0
        },
        imageSrc: "./img/img/backgroundLevel2.png"
      })

      door = [ //PORTA
        new Sprits({
          position: {
            x: 772,
            y: 336
          },
          imageSrc: "./img/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false
        })
      ]
    }
  },
  3: {
    init: () => {

      parsedCollisions = collisionsLevel3.parse2D()
      collisionsBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionsBlocks = collisionsBlocks
      player.position.x = 750
      player.position.y = 230
      player.lastDirection = "left"

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprits({
        position: {
          x: 0,
          y: 0
        },
        imageSrc: "./img/img/backgroundLevel3.png"
      })

      door = [ //PORTA
        new Sprits({
          position: {
            x: 175,
            y: 334
          },
          imageSrc: "./img/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false
        })
      ]
    }
  }
}

levels[level].init()

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  background.draw()

  collisionsBlocks.forEach(collisionsBlok => {
    collisionsBlok.draw()
  })

  door.forEach(doors => {
    doors.draw()
  })

  player.update()
  player.moviment(keys)

  ctx.save()
  ctx.globalAlpha = overlay.opacity
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()

}
animate()









