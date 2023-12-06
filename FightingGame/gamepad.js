function gamepadConnected(event, connect) {
  let gamepad = event.gamepad
  if (connect) {
    gamepad[gamepad.index] = gamepad
    console.log('Controle Conectado')
  } else {
    delete gamepad[gamepad.index]
    console.log('Controle Desconectado')
  }
}
window.addEventListener('gamepadconnected', (evento) => {
  gamepadConnected(evento, true)
})
window.addEventListener('gamepaddisconnected', (evento) => {
  gamepadConnected(evento, false)
})

function teste() {
  let gamepad = navigator.getGamepads()[1]
  if (gamepad) {
    // DIRECIONAL
    if (gamepad.axes[0] == -1) {
      player.velocity.x = -6
      player.swicthSprites('run')
      console.log("ESQUERDA")
    } else if (gamepad.axes[0] == 1) {
      player.velocity.x = 6
      player.swicthSprites('run')
      console.log("DIREITA")
    } else {
      player.velocity.x = 0
      player.swicthSprites('idle')
    }
    if (gamepad.axes[1] == -1) {
      console.log("CIMA")

    } else if (gamepad.axes[1] == 1) {
      console.log("BAIXO")
    }

    // BOTOES
    if (gamepad.buttons[0].pressed) { // X
      console.log("X")
    }
    if (gamepad.buttons[1].pressed) { // A
      console.log("A")
    }
    if (gamepad.buttons[2].pressed) { // B
      console.log("B")
      player.velocity.y = -10
      if (player.velocity.y < 0) {
        player.swicthSprites('jump')
      }
    } else if (player.velocity.y > 0) {
      player.swicthSprites('fall')
    }
    if (gamepad.buttons[3].pressed) { // Y
      console.log("Y")
      player.attack()
    }
    if (gamepad.buttons[4].pressed) { // L
      console.log("L")
    }
    if (gamepad.buttons[6].pressed) { // R
      console.log("R")
    }
    if (gamepad.buttons[8].pressed) { // Select
      console.log("SELECT")
    }
    if (gamepad.buttons[9].pressed) { // start
      console.log("START")
    }
  }
}
teste()




  // 0 ==> x
  // 1 ==> a
  // 2 ==> b
  // 3 ==> y

  // 4 ==> l
  // 5 ==>
  // 6 ==> r

  // 7 ==>
  // 8 ==> Select
  // 9 ==> start


