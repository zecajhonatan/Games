class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.radius = 5
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}

function tiro(x, y, velx = 3, vely = 0) {
    projectiles.push(
        new Projectile({
            position: {
                x: x,
                y: y,
            },
            velocity: {
                x: velx,
                y: vely,
            }
        })
    )
}

const projectiles = []

