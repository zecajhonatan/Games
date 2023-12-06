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
    pressed: false,
    loose: false
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true
      player.lastKeyPressed = event.key
      enemy.lastKeyPressed = event.key
      monster.lastKeyPressed = event.key
      evilWizard.lastKeyPressed = event.key
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true
      player.lastKeyPressed = event.key
      enemy.lastKeyPressed = event.key
      monster.lastKeyPressed = event.key
      evilWizard.lastKeyPressed = event.key
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true 
      monster.Attack = true
      break;
    default:
      break;
  }
})

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false
      keys.ArrowUp.hold = false
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false
      keys.ArrowDown.loose = false
      break;
    default:
      break;
  }
})