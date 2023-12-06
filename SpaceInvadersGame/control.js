let keys = {
  ArrowLeft: false,
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  space: false
}

addEventListener('keydown', ({ key }) => { // botão pressionado
  if (game.over) return
  switch (key) {
    case 'ArrowLeft':
      keys.ArrowLeft = true;
      player.lastkey = 'ArrowLeft';
      break
    case 'ArrowUp':
      keys.ArrowUp = true;
      break
    case 'ArrowRight':
      keys.ArrowRight = true;
      player.lastkey = 'ArrowRight';
      break
    case 'ArrowDown':
      keys.ArrowDown = true;
      break
    case ' ':
      keys.space = true;
        projectile()
      Shoot()
      
      break
  }
})

addEventListener('keyup', ({ key }) => { // botão solto
  if (game.over) return
  switch (key) {
    case 'ArrowLeft':
      keys.ArrowLeft = false;
      break
    case 'ArrowUp':
      keys.ArrowUp = false;
      break
    case 'ArrowRight':
      keys.ArrowRight = false;
      break
    case 'ArrowDown':
      keys.ArrowDown = false;
      break
    case ' ':
      keys.space = false;
      break
  }
})

