let platform = "./img/platform.png"
let hill = "./img/hills.png"
let background = "./img/background.png"
let platformSmallTall = "./img/platformSmallTall.png"

let spriteStandRight = "./img/spriteStandRight.png"
let spriteStandLeft = "./img/spriteStandLeft.png"
let spriteRunRight = "./img/spriteRunRight.png"
let spriteRunLeft = "./img/spriteRunLeft.png"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576
let musica = new Audio("./audios/ockaie_temple.ogg")
musica.after()

let flyingEye

// PLAYER
let player = new Player({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: spriteStandRight,
  frameRate: 60,

  animation: {
    spriteStandRight: {
      image: spriteStandRight,
      frameRate: 60
    },
    spriteStandLeft: {
      image: spriteStandLeft,
      frameRate: 60
    },
    spriteRunRight: {
      image: spriteRunRight,
      frameRate: 30
    },
    spriteRunLeft: {
      image: spriteRunLeft,
      frameRate: 30
    }
  }
})

let monster = new Monster({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: "./Wizard/idle.png",
  frameRate: 6,
  frameBuffer: 5,

  animation: {
    Idle: {
      image: "./Wizard/idle.png",
      frameRate: 6,
      frameBuffer: 8,
    },
    IdleLeft: {
      image: "./Wizard/idleLeft.png",
      frameRate: 6,
      frameBuffer: 8,
    },
    Run: {
      image: "./Wizard/Run.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    RunLeft: {
      image: "./Wizard/RunLeft.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Jump: {
      image: "./Wizard/Jump.png",
      frameRate: 2,
      frameBuffer: 8,
    },
    JumpLeft: {
      image: "./Wizard/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 8,
    },
    Fall: {
      image: "./Wizard/Fall.png",
      frameRate: 2,
      frameBuffer: 8,
    },
    FallLeft: {
      image: "./Wizard/FallLeft.png",
      frameRate: 2,
      frameBuffer: 8,
    },
    Attack1: {
      image: "./Wizard/Attack1.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Attack1Left: {
      image: "./Wizard/Attack1Left.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Attack2: {
      image: "./Wizard/Attack2.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Attack2Left: {
      image: "./Wizard/Attack2Left.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Hit: {
      image: "./Wizard/Hit.png",
      frameRate: 4,
      frameBuffer: 8,
    },
    HitLeft: {
      image: "./Wizard/HitLeft.png",
      frameRate: 4,
      frameBuffer: 8,
    },
  }
})

// ENEMY
let enemy = new Enemy({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: "./imgEvil/idle.png",
  frameRate: 8,
  frameBuffer: 10,

  animation: {
    Idle: {
      image: "./imgEvil/idle.png",
      frameRate: 8,
      frameBuffer: 10
    },
    IdleLeft: {
      image: "./imgEvil/idleLeft.png",
      frameRate: 8,
      frameBuffer: 10,
      frameLeft: 8,
      currentFrameLeft: 8,
    },
    Run: {
      image: "./imgEvil/Run.png",
      frameRate: 8,
      frameBuffer: 5
    },
    RunLeft: {
      image: "./imgEvil/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
      frameLeft: 8,
      currentFrameLeft: 8,
    },
    Jump: {
      image: "./imgEvil/Jump.png",
      frameRate: 2,
      frameBuffer: 10
    },
    JumpLeft: {
      image: "./imgEvil/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 10,
      frameLeft: 2,
      currentFrameLeft: 2,
    },
    Fall: {
      image: "./imgEvil/Fall.png",
      frameRate: 2,
      frameBuffer: 10
    },
    FallLeft: {
      image: "./imgEvil/FallLeft.png",
      frameRate: 2,
      frameBuffer: 10,
      frameLeft: 2,
      currentFrameLeft: 2,
    },
    Attack1: {
      image: "./imgEvil/Attack1.png",
      frameRate: 8,
      frameBuffer: 5,
      frameLeft: 8,
      currentFrameLeft: 8,
    },
    Attack1Left: {
      image: "./imgEvil/Attack1Left.png",
      frameRate: 8,
      frameBuffer: 5
    },
    Attack2: {
      image: "./imgEvil/Attack2.png",
      frameRate: 8,
      frameBuffer: 5
    },
    Death: {
      image: "./imgEvil/Death.png",
      frameRate: 7,
      frameBuffer: 10
    },
    Takehit: {
      image: "./imgEvil/Takehit.png",
      frameRate: 3,
      frameBuffer: 8
    }
  }
})

// EVOLWIZARD
let evilWizard = new EvilWizard({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  image: "./EvilWizard/idle.png",
  frameRate: 8,
  frameBuffer: 8,

  animation: {
    Idle: {
      image: "./EvilWizard/idle.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Run: {
      image: "./EvilWizard/Run.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    // Jump: {
    //   image: "./EvilWizard/Jump.png",
    //   frameRate: 2,
    //   frameBuffer: 5,
    // },
    // Fall: {
    //   image: "./EvilWizard/Fall.png",
    //   frameRate: 2,
    //   frameBuffer: 5,
    // },
    Attack: {
      image: "./EvilWizard/Attack.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    TakeHit: {
      image: "./EvilWizard/TakeHit.png",
      frameRate: 4,
      frameBuffer: 10,
    }
  }
})

//  new FlyingEye({
//   position: {
//     x: 0,
//     y: 350,
//   },
//   scale: 2,
//   image: "./FlyingEye/Flight.png",
//   frameRate: 8,
//   frameBuffer: 8,
//   animation: {
//     Flight: {
//       image: "./FlyingEye/Flight.png",
//       frameRate: 8,
//       frameBuffer: 8,
//     },
//     TakeHit: {
//       image: "./FlyingEye/TakeHit.png",
//       frameRate: 4,
//       frameBuffer: 8,
//     },
//     Attack2: {
//       image: "./FlyingEye/Attack2.png",
//       frameRate: 8,
//       frameBuffer: 8,
//     },
//   }
// })


// FLUINGEYE
flyingEye = new FlyingEye({
  position: {
    x: 500,
    y: 270,
  },
  velocity: {
    x: 0,
    y: 0
  },
  scale: 1.5,
  image: "./FlyingEye/Flight.png",
  frameRate: 8,
  frameBuffer: 8,

  animation: {
    Flight: {
      image: "./FlyingEye/Flight.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    FlightLeft: {
      image: "./FlyingEye/FlightLeft.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    TakeHit: {
      image: "./FlyingEye/TakeHit.png",
      frameRate: 4,
      frameBuffer: 10,
    },
    Death: {
      image: "./FlyingEye/Death.png",
      frameRate: 4,
      frameBuffer: 10,
    },
    Attack2: {
      image: "./FlyingEye/Attack2.png",
      frameRate: 8,
      frameBuffer: 8,
    },
    Attack2Left: {
      image: "./FlyingEye/Attack2Left.png",
      frameRate: 8,
      frameBuffer: 8,
    },
  }
})

let fogo = [
  new Fogo({ x: 1000, y: 389, image: "./Wizard/fogo.png", frameRate: 8, frameBuffer: 8, scale: 2 }),
  new Fogo({ x: 1500, y: 389, image: "./Wizard/fogo.png", frameRate: 8, frameBuffer: 8, scale: 2 }),
  new Fogo({ x: 2000, y: 389, image: "./Wizard/fogo.png", frameRate: 8, frameBuffer: 8, scale: 2 })
]

let scrollOffset = 0
let backgrounds = []
let platforms = []
let coin = []
let skeleto = [] // ESQUELETO
let sword = [] // ESPADA

function init() {

  scrollOffset = 0

  backgrounds = [
    new GenericObject({ x: -1, y: -1, imageSrc: background }),
    new GenericObject({ x: -1, y: -1, imageSrc: hill })
  ]

  platforms = [
    new Platform({ x: 800, y: 349, imageSrc: platformSmallTall }),
    new Platform({ x: 1600, y: 349, imageSrc: platformSmallTall }),
    new Platform({ x: 2200, y: 349, imageSrc: platformSmallTall }),

    new Platform({ x: -1, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 1, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 2, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 3, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 4, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 5, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 6, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 7, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 8, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 9, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 10, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 11, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 12, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 13, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 14, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 15, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 16, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 17, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 18, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 19, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 20, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 21, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 22, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 23, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 24, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 25, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 26, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 27, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 28, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 29, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 30, y: 451, imageSrc: platform }),
    new Platform({ x: 573 * 31, y: 451, imageSrc: platform }),
  ]
  enemy.position.x = 100
  enemy.position.y = 0
  player.position.x = 100
  player.position.y = 0
  monster.position.x = 300
  monster.position.y = 0
  evilWizard.position.x = 300
  evilWizard.position.y = 0
  // skeleton.position.x = 300
  // skeleton.position.y = 250
}

function loop() {
  inicio = requestAnimationFrame(loop)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  backgrounds.forEach(background => {
    background.update()
  })

  platforms.forEach((platform) => {
    platform.update()
  })

  // skeleto.forEach((skeletons) => {
  //   skeletons.update()
  // })


  // coin.forEach((coins) => {
  //   coins.update()
  // })

  // player.update()
  // enemy.update()
  monster.update()
  // evilWizard.update()

  flyingEye.update()
  // swordSprite.update()

  // fogo.forEach((fogos) => {
  //   fogos.update()
  // })

  // sword.forEach((swords) => {
  //   swords.update()
  // })




}
init()
loop()

