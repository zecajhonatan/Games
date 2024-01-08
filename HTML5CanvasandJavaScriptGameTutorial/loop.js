const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let animatioId
let scoreEl = document.querySelector("#scoreEl")
let score = 0
let startGameBtn = document.querySelector("#startGameBtn")
let modalEl = document.querySelector("#modalEl")
let bigScoreEl = document.querySelector("#bigScoreEl")

let allprojectiles = []
let allenemyes = []
let particles = []

// Player
let player = new Player({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2
  },
  velocity: {
    x: 0,
    y: 0,
  },
  radius: 10,
  color: "rgba(255,255,255)"
})

function init() {

  allprojectiles = []
  allenemyes = []
  particles = []

  // Player
  player = new Player({
    position: {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
    velocity: {
      x: 0,
      y: 0,
    },
    radius: 10,
    color: "rgba(255,255,255)"
  })

  score = 0
  scoreEl.innerHTML = 0
}

function spawnEnemy() {
  setInterval(() => {

    let x
    let y

    let radius = Math.random() * (30 - 4) + 4
    let color = `hsl(${Math.random() * 360}, ${50}%, ${50}%)`

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + 30
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + 30
    }

    // PEGAR O ALGULO DE UM OBJETO EM RELAÇÃO AO OUTRO
    let dy = canvas.height / 2 - y
    let dx = canvas.width / 2 - x
    let angle = Math.atan2(dy, dx)
    let velY = Math.sin(angle) // SENO PARA POSIÇÃO Y
    let velX = Math.cos(angle) // COSSENO PARA POSIÇÃO X

    allenemyes.push(// ENVIA UM PROJETIL PARA O ARRAY
      new Enemy({
        position: {
          x: x,
          y: y
        },
        velocity: {
          x: velX,
          y: velY,
        },
        radius: radius,
        color: color
      })
    )

  }, 1000)
}

window.document.addEventListener("click", (event) => {

  // PEGAR O ALGULO DE UM OBJETO EM RELAÇÃO AO OUTRO
  let dy = event.clientY - canvas.height / 2 // DIMINUI A DISTANCIA DE Y ENTRE OS PONTOS
  let dx = event.clientX - canvas.width / 2 // DIMINUI A DISTANCIA DE X ENTRE OS PONTOS
  let angle = Math.atan2(dy, dx) // GERA UM ANGULO DE UM OBEJTO EM RELAÇÃO AO OUTRO

  let velY = Math.sin(angle) * 3
  let velX = Math.cos(angle) * 3

  allprojectiles.push( // ENVIA UM PROTIL PARA O ARRAY
    new Projectile({ // NOVO PROJETIL
      position: {
        x: canvas.width / 2,
        y: canvas.height / 2
      },
      velocity: {
        x: velX,
        y: velY,
      },
      radius: 5,
      color: "rgba(255,255,255)"
    })
  )
})

startGameBtn.addEventListener("click", () => {
  modalEl.style.display = "none"
  init()
  animation()
  spawnEnemy()
})


function animation() {
  animatioId = requestAnimationFrame(animation)
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  // ctx.fillStyle = "#000"
  // ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player.update()

  particles.forEach((Particle, index) => { // REMOVE AS PARTICULAS DA AREA DO JOGO
    if (Particle.alpha <= 0) {
      particles.splice(index, 1)
    } else {
      Particle.update() // DESENHA A PARTICULA
    }
  })

  allprojectiles.forEach((projectile, index) => { // LOOP DOS PROJETEIS

    if ( // VERIFICA A SE OS PROJETEIS JA SAIRAM DA TELA COM ISSO E FEITA A EXCLUSÃO DE CADA UM 
      projectile.position.x + projectile.radius < 0
      ||
      projectile.position.x - projectile.radius > canvas.width
      ||
      projectile.position.y + projectile.radius < 0
      ||
      projectile.position.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        allprojectiles.splice(index, 1)
      }, 0)
    } else {
      projectile.update() // DESENHA OS PROJETEIS NA TELA
    }
  })

  allenemyes.forEach((enemy, indexEnemy) => {
    enemy.update()

    // COLISÃO DO INIMIGO COM O PLAYER ==> FINALIZA O JOGO/ PARA O LOOP
    let dist1 = Math.floor(Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y)) // VERIFICA A DISTANCIA ENTRE OS PONTOS DO INIMIGO COM O PLAYER
    if (dist1 - player.radius - enemy.radius < 0) {

      // PARA O LOOP QUANDO PLAYER E ATINGIDO POR ALGUM INIMIGO
      cancelAnimationFrame(animatioId)

      // APARENCEDO COM O MODAL DE FIM DO JOGO
      modalEl.style.display = "flex"
      bigScoreEl.innerHTML = score
    }

    // COLISÃO DO PROJETEL COM O INIMIGO
    allprojectiles.forEach((projectile, indexProjectiles) => {
      let dist = Math.floor(Math.hypot(projectile.position.x - enemy.position.x, projectile.position.y - enemy.position.y)) // VERIFICA A DISTANCIA ENTRE OS PONTOS DO PROJETIL COM O INIMIGO
      if (dist - projectile.radius - enemy.radius < 0) {

        //CRIAÇÃO DE PARTICULAS DEPOIS QUE O INIMIGO E ATINGIDO FAZENDO UM EXPLOSÃO
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(new Particle({
            position: {
              x: projectile.position.x,
              y: projectile.position.y
            },
            velocity: {
              x: (Math.random() - 0.5) * (Math.random() * 8),
              y: (Math.random() - 0.5) * (Math.random() * 8),
            },
            radius: Math.random() * 2,
            color: enemy.color,
            alpha: 1
          }))
        }

        // DIMINUINDO O TAMANHO DO INIMIGO
        if (enemy.radius - 10 > 5) { // RAIO DO INIMIGO

          // CRIAÇÃO DA PONTUAÇÃO AO DIMINUIR O TAMANHO DO INIMIGO
          score += 10
          scoreEl.innerHTML = score

          gsap.to(enemy, { // FAZ A TRANSIÇÃO DO TAMANHO DO INIMIGO
            radius: enemy.radius - 10
          })
          setTimeout(() => {
            allprojectiles.splice(indexProjectiles, 1) // EXCLUI O INIMIGO E O PROJETIL QUANDO DE TOCAM
          }, 0)
        } else {

          // CRIAÇÃO DA PONTUAÇÃO AO ELIMINAR COMPLETAMENTE O INIMIGO
          score += 100
          scoreEl.innerHTML = score

          setTimeout(() => {
            allprojectiles.splice(indexProjectiles, 1) // EXCLUI O INIMIGO E O PROJETIL QUANDO DE TOCAM
            allenemyes.splice(indexEnemy, 1)
          }, 0)
        }

      }
    })

  })

}



