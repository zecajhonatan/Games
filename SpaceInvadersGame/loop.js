let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let scoreEl = document.querySelector('#scoreEl')
let teste = document.querySelector('#teste')
let interno = document.querySelector('#interno')
let iniciarJogo = document.querySelector('#iniciarJogo')
let pararJogo = document.querySelector('#pararJogo')
let reiniciarJogo = document.querySelector('#reiniciarJogo')
let corpo = document.querySelector('#corpo')
let vida = document.querySelector('#vida')
let paginaPrincipal = document.querySelector('#paginaPrincipal')

let width = 1024
let height = 576

canvas.width = width
canvas.height = height

let frames = 0
let jogo = true
let numero = 200
let base
let parar = true
let game = {
  over: false,
  active: true
}

let score = 0
let adicional = 0

iniciarJogo.addEventListener('click', () => {
  if (jogo) {
    // backgroundMusic()
    start.play()
    requestAnimationFrame(animation)

    setTimeout(() => {
      corpo.classList.remove('sumir')
      corpo.classList.add('.parar')
      vida.classList.remove('sumir')
      vida.classList.add('.parar')
    }, 2000)

    setTimeout(() => {
      paginaPrincipal.classList.add('sumir')
    }, 2000)
    musicaJogo.play()
  }
  jogo = false
})

pararJogo.addEventListener('click', () => {
  // location.reload()

  if (!jogo) {
    if (parar) {
      cancelAnimationFrame(base)
      musicaJogo.pause()
      // shoot.play()
      parar = false
    } else if (!parar) {
      requestAnimationFrame(animation)
      musicaJogo.play()
      // shoot.play()
      parar = true
    }
  }
})

reiniciarJogo.addEventListener('click', () => {
  jogo = true
  location.reload()
})

let musicaJogo = new Audio('./audio/backgroundMusic.wav')
let start = new Audio('./audio/start.mp3')
let bonus = new Audio('./audio/bonus.mp3')

function naveDestruida() {
  let tiro = new Audio()
  tiro.src = './audio/bomb.mp3'
  tiro.play()
}

function Shoot() {
  let tiro = new Audio()
  tiro.src = './audio/Shoot.wav'
  tiro.play()
}
function enemyShoot() {
  let tiro = new Audio()
  tiro.src = './audio/enemyShoot.wav'
  tiro.play()
}
function gameover() {
  let tiro = new Audio()
  tiro.src = './audio/gameOver.mp3'
  tiro.play()
}

let randomInteval = Math.floor(Math.random() * 500 + 500)

function ceu() {
  for (let i = 0; i < 0.5; i++) {
    particles.push(new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      },
      velocity: {
        x: 0,
        y: 0.5
      },
      radius: Math.random() * 2,
      color: 'white'
    }))
  }
}

function createParticles({ object, color }) {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      radius: Math.random() * 3,
      color: color || '#BAA0DE'
    }))
  }
}

function playerParticles({ object, color }) {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      velocity: {
        x: (Math.random() - 0.5) * 3,
        y: 1.5
      },
      radius: Math.random() * 3,
      color: color || 'yellow'
    }))
  }
}




function animation() {
  
  if (!game.active) return
  if (!jogo) {
    base = requestAnimationFrame(animation)
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update()

  // ceu()
  // EXCLUINDO AS PARTICULAS DO DO CENARIO
  particles.forEach((particle, i) => {
    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1)
      })
    } else {
      particle.update() // DESENHA PARTICULAS
    }
  })

  InvaderProjectiles.forEach((invaderProjectile, index) => {
    // projeteis
    if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
      setTimeout(() => {
        InvaderProjectiles.splice(index, 1)
      }, 0)
    } else {
      invaderProjectile.update() // DESENHA PROJETEIS DO INVASOR
    }

    //VERIFICA SE O PROJETEL TEVE COLISÃO COM A NAVE
    if (
      invaderProjectile.position.y + invaderProjectile.height >= player.position.y
      &&
      invaderProjectile.position.x >= player.position.x
      &&
      invaderProjectile.position.x + invaderProjectile.width <= player.position.x + player.width
    ) {
      naveDestruida()
      numero -= 20
      interno.style.width = numero + 'px'

      setTimeout(() => {
        InvaderProjectiles.splice(index, 1)
      }, 0)


      // DETERMINA O FIM DO JOGO
      if (numero <= 0) {
        setTimeout(() => {
          teste.classList.remove('.gameover')
          teste.classList.add('parar')

        }, 2000)

        setTimeout(() => {
          player.opacity = 0
          gameover()
          game.over = true
        }, 0)

        setTimeout(() => {
          game.active = false
          musicaJogo.pause()
        }, 4000)
      }


      playerParticles({ object: invaderProjectile, color: 'yellow', fades: true })
      // playerParticles({ object: player, color: 'red' })
      // playerParticles({ object: player, color: '#fff' })
    }
  })


  // EXCLUINDO OS PROJETEIS QUE SAIREM DO CENARIO
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    } else {
      projectile.update() // DESENHA PROJETEIS
    }
  })

  // array of grids
  grids.forEach((grid, gridIndex) => {
    grid.update() // DESENHA A GRADE

    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(InvaderProjectiles)
    }

    grid.invaders.forEach((invader, i) => {

      invader.update({ velocity: grid.velocity })
      // VERIFICA A COLIZAO DO PREJETEL COM O INVASOR
      projectiles.forEach((projectile, j) => {
        if (
          projectile.position.y - projectile.radius <= invader.position.y + invader.height
          &&
          projectile.position.x + projectile.radius >= invader.position.x
          &&
          projectile.position.x - projectile.radius <= invader.position.x + invader.width
          &&
          projectile.position.y + projectile.radius >= invader.position.y
        ) {
          score += 10
          scoreEl.innerHTML = score
          enemyShoot()

          setTimeout(() => {

            const invaderFound = grid.invaders.find((invader2) => invader2 === invader)
            const projectileFound = projectiles.find((projectile2) => projectile2 === projectile)

            if (invaderFound && projectileFound) {


              // createParticles({ object: invader, color: '#BAA0DE' })

              grid.invaders.splice(i, 1)
              projectiles.splice(j, 1)

              if (grid.invaders.length > 0) {

                let firstInvader = grid.invaders[0]
                let lastInvader = grid.invaders[grid.invaders.length - 1]
                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width
                grid.position.x = firstInvader.position.x

              } else {
                grids.splice(gridIndex, 1)
              }
            }
          }, 0)
        }
      })
    })

  })

  if (frames % randomInteval === 0) {
    grids.push(new Grid())
    randomInteval = Math.floor(Math.random() * 500 + 500)
    frames = 0
  }

  frames++


  movementPlayer()
}
animation()







