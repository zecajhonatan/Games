//Detect Collision ==> Detecta Colisao
function rectangularCollision({ rectangular1, rectangular2 }) {
    return (
        rectangular1.attackBox.position.x + rectangular1.attackBox.width >= rectangular2.position.x
        &&
        rectangular1.attackBox.position.x <= rectangular2.position.x + rectangular2.width
        &&
        rectangular1.attackBox.position.y + rectangular1.attackBox.height >= rectangular2.position.y
        &&
        rectangular1.attackBox.position.y <= rectangular2.position.y + rectangular2.height
    )
}
