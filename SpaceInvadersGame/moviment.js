function movementPlayer() {
  if (keys.ArrowLeft && player.position.x >= 0 && player.lastkey === 'ArrowLeft') {
    player.velocity.x = -7
    player.rotation = -0.15
  } else if (keys.ArrowRight && player.position.x + player.width < canvas.width && player.lastkey === 'ArrowRight') {
    player.velocity.x = 7
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }
}


