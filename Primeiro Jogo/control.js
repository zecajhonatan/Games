const keys = {
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  b: {
    pressed: false
  }
}

window.document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true
      break;
    case "b":
      keys.b.pressed = true
      break;
  }
})

window.document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false
      break;
      case "b":
        keys.b.pressed = false
        plataform.button = false
        break;
  }
})

