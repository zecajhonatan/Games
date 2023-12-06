function movement() {

    // MOVIMENTO PLAYER
    player.velocity.x = 0
    if (key.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -6
        player.swicthSprites('run')
    } else if (key.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 6
        player.swicthSprites('run')
    } else {
        player.swicthSprites('idle')
    }
    if (player.velocity.y < 0) {
        player.swicthSprites('jump')
    } else if (player.velocity.y > 0) {
        player.swicthSprites('fall')
    }

    if (key.w.pressed && !key.w.hold) {
        player.jump()
        key.w.hold = true
    }

    //MOVIMENTO INIMIGO
    enemy.velocity.x = 0
    if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -6
        enemy.swicthSprites('run')
    } else if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 6
        enemy.swicthSprites('run')
    } else {
        enemy.swicthSprites('idle')
    }

    if (enemy.velocity.y < 0) {
        enemy.swicthSprites('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.swicthSprites('fall')
    }

    if (key.ArrowUp.pressed && !key.ArrowUp.hold) {
        enemy.jump()
        key.ArrowUp.hold = true
    }

    // COLISÃO DO JOGADOR COM O INIMIGO
    if (rectangularCollision({ rectangular1: player, rectangular2: enemy, }) && player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    // COLISÃO INIMIGO COM O JOGADOR
    if (rectangularCollision({ rectangular1: enemy, rectangular2: player, }) && enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy })
        iniciaJogo = true
    }
}