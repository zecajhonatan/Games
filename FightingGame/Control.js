let key = {
    a: { pressed: false },
    d: { pressed: false },
    w: {
        pressed: false,
        hold: false
    },
    b: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: {
        pressed: false,
        hold: false
    },
    Enter: { pressed: false },
}

window.addEventListener('keydown', (event) => { // tecla pressionada
    switch (event.key) {
        // COMAND PLAYER
        case 'a':
            key.a.pressed = true
            player.lastKey = 'a'
            break
        case 'd':
            key.d.pressed = true
            player.lastKey = 'd'
            break
        case 'w':
            key.w.pressed = true
            break
        case ' ':
            player.attack()
            break

        // COMAND ENEMY  
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            key.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowUp':
            key.ArrowUp.pressed = true
            break
        case 'Enter':
            key.Enter.pressed = true
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => { // tecla solta
    switch (event.key) {
        case 'a':
            key.a.pressed = false
            break
        case 'd':
            key.d.pressed = false
            break
        case 'w':
            key.w.pressed = false
            key.w.hold = false
            break
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            key.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            key.ArrowUp.pressed = false
            key.ArrowUp.hold = false
            break
    }
})

