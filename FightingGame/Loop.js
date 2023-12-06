let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let timer = 60
let timeId
let iniciaJogo = false
let requesteId

// ============================DETERMINA O VENCEDOR=====================================


function determineWinner({ player, enemy }) {
    clearTimeout(timeId)
    cancelAnimationFrame(requesteId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').style.display = 'flex'
        document.querySelector('#displayText').innerHTML = 'Player 1 wins!'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 wins!'
    }
}


// ===========================TEMPO INVERSO JOGO======================================

function decreaseTime() { // diminuir tempo
    timeId = setTimeout(decreaseTime, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#time').innerHTML = timer
    }
    if (timer === 0) {
        determineWinner({ player, enemy })
    }
}

let parar = cancelAnimationFrame(requesteId)
// =================================LOOP================================
function animate() {

    requesteId = requestAnimationFrame(animate)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    shop.update()
    player.update()
    enemy.update()

    movement()
    // teste()
}

animate()

// ==============================INICIO JOGO===================================


function iniciar() {
    iniciaJogo = true
    if (iniciaJogo) {
        decreaseTime()
    }
}
