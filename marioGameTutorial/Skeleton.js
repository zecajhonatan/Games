class Skeleton {
    constructor({ position, velocity, image, frameRate, frameBuffer = 100, scale = 2, animation }) {
        this.position = position
        this.velocity = velocity
        this.frameRate = frameRate
        this.frameBuffer = frameBuffer
        this.scale = scale
        this.animation = animation

        this.elapsedFrame = 0
        this.currentFrame = 0
        this.soma = 500

        this.lastPosition
        this.Attack = false
        this.Attack3 = false
        this.isHitAttack = false
        this.life = 100

        this.somar = 500

        this.stopAnimation = true 

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 30 * this.scale,
            height: 55 * this.scale,
            offSet: {
                x: 50,
                y: 0,
            }
        }

        this.hitAttack = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 90 * this.scale,
            height: 15 * this.scale,
            offSet: 0, // offSet correto e 90
        }

        this.image = new Image()
        this.image.src = image
        this.image.onload = () => {
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }

        if (this.image) {
            for (let key in this.animation) {
                let image = new Image()
                image.src = this.animation[key].image
                this.animation[key].image = image
            }
        }
    }

    switchFrames(name) {
        if (this.image === this.animation[name].image) return
        this.image = this.animation[name].image
        this.frameRate = this.animation[name].frameRate
        this.frameBuffer = this.animation[name].frameBuffer
        this.width = this.image.width / this.frameRate
        this.height = this.image.height
    }

    draw() {
        this.hitbox.position.x = this.position.x + 120
        this.hitbox.position.y = this.position.y + 93

        this.hitAttack.position.x = this.hitbox.position.x - this.hitAttack.offSet
        this.hitAttack.position.y = this.hitbox.position.y + 20

        ctx.fillStyle = "rgba(255,0,0, 0.0)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.fillStyle = "rgba(0,255,0, 0.0)"
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)


        if (this.isHitAttack) {
            ctx.fillStyle = "rgba(0,0,255, 0.0)"
            ctx.fillRect(this.hitAttack.position.x, this.hitAttack.position.y, this.hitAttack.width, this.hitAttack.height)
        }

<<<<<<< HEAD


        ctx.fillStyle = "yellow"
        ctx.font = "25px serif";
        ctx.fillText(`${monster.life}`, this.position.x + 130, this.position.y + 90)


=======
>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd
        ctx.drawImage(
            this.image,
            this.width * this.currentFrame,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width * this.scale,
            this.height * this.scale
        )

        this.updateFrames()

        if (!this.stopAnimation) return
        ctx.fillStyle = "rgba(255,0,0, 1)"
        ctx.font = "25px serif";
        ctx.fillText(`${this.life}`, this.position.x + 130, this.position.y + 90)

    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
        this.animationEnemy()
<<<<<<< HEAD
        this.collisionPlay()
=======
        this.collisionPlayer()
>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd

        // ATTACK
        if (!this.stopAnimation) return
        if (this.lastPosition == "right" && this.Attack) {
            this.switchFrames('Attack')
        } else if (this.lastPosition == "left" && this.Attack) {
            this.switchFrames('AttackLeft')
        }
    }

    animationEnemy() {
<<<<<<< HEAD
=======
        // ANIMAÇÃO SKELETON

>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd
        if (monster.hitbox.position.x > this.hitbox.position.x + this.hitbox.width) {
            this.hitAttack.offSet = 0
            this.lastPosition = "right"
            if (!this.stopAnimation) return 
            this.velocity.x = 1.5
            this.switchFrames('Walk')
        } else if (monster.hitbox.position.x + monster.hitbox.width < this.hitbox.position.x) {
            this.hitAttack.offSet = 100
            this.lastPosition = "left"
            if (!this.stopAnimation) return
            this.switchFrames('WalkLeft')
            this.velocity.x = -1.5
        } else {
            this.velocity.x = 0
            if (!this.stopAnimation) return
            if (this.lastPosition == "right") {
                this.switchFrames('Idle')
            } else if (this.lastPosition == "left") {
                this.switchFrames('IdleLeft')
            }
        }
        //CONDICÃO ATTACK
<<<<<<< HEAD
=======
        if (!this.stopAnimation) return
>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd
        if (
            this.hitbox.position.x + this.hitbox.width > monster.hitbox.position.x - 80
            &&
            this.hitbox.position.x < monster.hitbox.position.x + this.hitbox.width + 80
        ) {           
            this.velocity.x = 0
            this.Attack = true
            setTimeout(() => {
                this.Attack = false
            }, 1000)

            setTimeout(() => {
                this.isHitAttack = true
            }, 500)
            setTimeout(() => {
                this.isHitAttack = false
<<<<<<< HEAD
            }, 1000)
        }
        //CONDICÃO ATTACK 3
        if (scrollOffset == this.somar) {
            this.velocity.x = 0
            this.Attack3 = true

            setTimeout(() => {
                if (monster.hitbox.position.x > this.hitbox.position.x + this.hitbox.width) {
                    sword.push(
                        new SwordSprite({
                            position: {
                                x: this.hitbox.position.x + this.hitbox.offSet.x,
                                y: this.hitbox.position.y + this.hitbox.offSet.y,
                            },
                            velocity: {
                                x: 6,
                                y: 0
                            },
                            scale: 1.3,
                            image: "./Skeleton/Sword.png",
                            frameRate: 3,
                            frameBuffer: 10,
                            animation: {
                                SwordTransmitting: {
                                    image: "./Skeleton/SwordTransmitting.png",
                                    frameRate: 5,
                                    frameBuffer: 10,
                                },
                                SwordTransmittingLeft: {
                                    image: "./Skeleton/SwordTransmittingLeft.png",
                                    frameRate: 5,
                                    frameBuffer: 10,
                                },
                            }
                        })
                    )
                } else if (monster.hitbox.position.x + monster.hitbox.width < this.hitbox.position.x) {
                    sword.push(
                        new SwordSprite({
                            position: {
                                x: this.hitbox.position.x + -this.hitbox.offSet.x,
                                y: this.hitbox.position.y + this.hitbox.offSet.y,
                            },
                            velocity: {
                                x: -6,
                                y: 0
                            },
                            scale: 1.3,
                            image: "./Skeleton/SwordLeft.png",
                            frameRate: 3,
                            frameBuffer: 10,
                            animation: {
                                SwordTransmitting: {
                                    image: "./Skeleton/SwordTransmitting.png",
                                    frameRate: 5,
                                    frameBuffer: 10,
                                    scale: 1.3,
                                },
                                SwordTransmittingLeft: {
                                    image: "./Skeleton/SwordTransmittingLeft.png",
                                    frameRate: 5,
                                    frameBuffer: 10,
                                    scale: 1.3,
                                },
                            }

                        })
                    )
                }
            }, 750)

            setTimeout(() => {
                this.Attack3 = false
            }, 1000)
            this.somar += 500

        }
    }

    collisionPlay() {
        skeleto.forEach((skeletos, index) => {
            if (
                monster.hitattack.position.x < this.hitbox.position.x + this.hitbox.width
                &&
                monster.hitattack.position.x + monster.hitattack.width > this.hitbox.position.x
                &&
                monster.hitattack.position.y < this.hitbox.position.y + this.hitbox.height
                &&
                monster.hitattack.position.y + monster.hitattack.height > this.hitbox.position.y
                &&
                monster.isAttack
            ) {



                if (this.lastPosition == "right") {
                    console.log("Teste 1")
                    skeletos.switchFrames('TakeHit')
                } else if (this.lastPosition == "left") {
                    console.log("Teste 2")
                    skeletos.switchFrames('TakeHit')
                }

            }
        })

    }

    updateFrames() {
        this.elapsedFrame++
        if (this.elapsedFrame % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    }
}

// ESPADA
class SwordSprite {
    constructor({ position, velocity, image, frameRate, frameBuffer = 10, scale = 2, animation }) {
        this.position = position
        this.velocity = velocity
        this.frameRate = frameRate
        this.frameBuffer = frameBuffer
        this.scale = scale
        this.animation = animation

        this.elapsedFrame = 0
        this.currentFrame = 0

        this.lastPosition
        this.Attack = false
        this.isHitAttack = false

        this.somar = 500

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 30 * this.scale,
            height: 30 * this.scale
        }

        this.image = new Image()
        this.image.src = image
        this.image.onload = () => {
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }

        if (this.image) {
            for (let key in this.animation) {
                let image = new Image()
                image.src = this.animation[key].image
                this.animation[key].image = image
            }
        }
    }

    switchFrames(name) {
        if (this.image === this.animation[name].image) return
        this.image = this.animation[name].image
        this.frameRate = this.animation[name].frameRate
        this.width = this.image.width / this.frameRate
        this.height = this.image.height
    }

    draw() {
        this.hitbox.position.x = this.position.x + 50
        this.hitbox.position.y = this.position.y + 50

        ctx.fillStyle = "rgba(255,0,0, 0.5)"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.fillStyle = "rgba(0,255,0, 0.3)"
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

        ctx.drawImage(
            this.image,
            this.width * this.currentFrame,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width * this.scale,
            this.height * this.scale
        )

        this.updateFrames()
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
        this.animationEnemy()
    }

    animationEnemy() {
        // EXCLUSÃO DAS ESPADAS QUE NÃO COLIDEM COM O PLAYER
        if (this.hitbox.position.x + this.hitbox.width > canvas.width + 8000 || this.hitbox.position.x < -5000) {
            sword.forEach((swords, index) => {
                sword.splice(index, 1)
            })
        }
        // COLISÃO DO ESPADA COM O PLAYER
=======
            }, 700)
        }
    }

    collisionPlayer() {
>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd
        if (
            this.hitAttack.position.x < monster.hitbox.position.x + monster.hitbox.width
            &&
            this.hitAttack.position.x + this.hitAttack.width > monster.hitbox.position.x
            &&
            this.hitAttack.position.y < monster.hitbox.position.y + monster.hitbox.height
            &&
            this.hitAttack.position.y + this.hitAttack.height > monster.hitbox.position.y
            &&
            this.isHitAttack
            &&
            this.currentFrame == 7
        ) {
<<<<<<< HEAD
            if (this.velocity.x > 0) {
                monster.switchFrames('Hit')
                this.switchFrames('SwordTransmitting')
                this.velocity.x = 0
                monster.velocity.x = 0
                setTimeout(() => {
                    sword.forEach((swords, index) => {
                        sword.splice(index, 1)
                    })
                }, 400)
            } else if (this.velocity.x < 0) {
                monster.switchFrames('HitLeft')
                this.switchFrames('SwordTransmittingLeft')
                this.velocity.x = 0
                monster.velocity.x = 0
                setTimeout(() => {
                    sword.forEach((swords, index) => {
                        sword.splice(index, 1)
                    })
                }, 400)
=======
            if (monster.lastPosition == "right") {
                monster.switchFrames("Hit")
            } else if (monster.lastPosition == "left") {
                monster.switchFrames("HitLeft")
>>>>>>> b9f7d0d712137387a8d39510376001e9b0da03bd
            }
        }
    }

    updateFrames() {
        this.elapsedFrame++
        if (this.elapsedFrame % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else {
                if (!this.stopAnimation) return
                this.currentFrame = 0
            }
        }
    }
}



