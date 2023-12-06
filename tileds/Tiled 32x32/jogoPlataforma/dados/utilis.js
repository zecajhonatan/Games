Array.prototype.parse2D = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 96) {
    rows.push(this.slice(i, i + 96))
  }
  return rows
}

Array.prototype.createObjectsFrom2D = function () {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 227) {
        objects.push(
          new CollisionBlock({
            position: {
              x: x * 32, // linha 
              y: y * 32, // coluna
            },
            velocity: {
              x: 5,
              y: 5,
            },
            speedX: 0,
            speedY: 0
          })
        )
      }
    })
  })
  return objects
}