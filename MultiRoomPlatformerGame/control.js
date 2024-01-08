let keys = {
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false,
    hold: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
}

window.document.addEventListener("keydown", (event) => {
  let key = event.key
  if (player.preventInput) return
  switch (key) {
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      player.lastKeyPressed = key // ultima tecla pressionada
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = true

      for (let i = 0; i < door.length; i++) {
        let doors = door[i]
        if (
          player.hitbox.position.x + player.hitbox.width <= doors.position.x + doors.width
          &&
          player.hitbox.position.x >= doors.position.x
          &&
          player.hitbox.position.y + player.hitbox.height >= doors.position.y
          &&
          player.hitbox.position.y <= doors.position.y + doors.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprit('enterDoor')
          doors.play()
          return
        }
      }
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      player.lastKeyPressed = key
      break;
    case 'ArrowDown':
      keys.ArrowDown.pressed = true
      break;
  }
})

window.document.addEventListener("keyup", (event) => {
  let key = event.key
  switch (key) {
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      keys.ArrowUp.hold = false
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break;
    case 'ArrowDown':
      keys.ArrowDown.pressed = false
      break;
  }
})