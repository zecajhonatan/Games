let keys = {
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
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.code) {
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
  }
})

window.addEventListener("keyup", (e) => {
  switch (e.code) {
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
  }
})