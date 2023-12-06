class Bola {
    constructor(ctx, pad) {
        this.ctx = ctx
        this.pad = pad
        this.movendo = false
        this.direcaoBolaX = -1
        this.direcaoBolaY = 0
        this.velocidade = 3
        this.largura = 10
        this.altura = 10
        this.posicaoX = (this.ctx.canvas.width / 2) - (this.largura / 2)
        this.posicaoY = (this.ctx.canvas.height / 2) - (this.altura / 2)
    }

    iniciar() {
        this.movendo = true
        this.direcaoBolaY = 0
        //this.direcaoBolaX = -1
        //this.direcaoBolaY = (Math.random() * 10 > 5 ? -1 : 1)
    }

    gerenciar() {
        if (this.movendo) {

            // MOVIMENTAÇÃO DA BOLA

            this.posicaoX += (this.direcaoBolaX * this.velocidade)
            this.posicaoY += (this.direcaoBolaY * this.velocidade)

            // COLISÃO COM BORDAS DA ESQUERDA

            if (this.posicaoX >= (this.ctx.canvas.width - this.largura)) {
                this.direcaoBolaX = -1
                pontuacaoJ1++
                this.resetarBola()
                this.direcaoBolaX = -1
            }

            // COLISÃO COM BORDAS DA DIREITA

            if (this.posicaoX <= 0) {
                this.direcaoBolaX = 1
                pontuacaoJ2++
                this.resetarBola()
                this.direcaoBolaX = 1
            }

            // COLISÃO COM BORDA SUPERIOR

            if (this.posicaoY >= (this.ctx.canvas.height - this.altura)) {
                this.direcaoBolaY *= -1
            }

            // COLISÃO COM BORDA INFERIOR

            if (this.posicaoY <= 0) {
                this.direcaoBolaY *= -1
            }

            // COLISÃO COM O JOGADOR

            if (
                (this.posicaoX <= this.pad.posicaoX + this.pad.largura && this.posicaoX + this.largura >= this.pad.posicaoX)
                &&
                (this.posicaoY + this.altura >= this.pad.posicaoY && this.posicaoY <= this.pad.posicaoY + this.pad.altura)
            ) {
                this.direcaoBolaX = 1
                this.direcaoBolaY = ((this.posicaoY + (this.altura / 2)) - (this.pad.posicaoY + (this.pad.altura / 2))) / 16
                console.log(this.direcaoBolaY)
            }

        }
    }

    resetarBola() {
        this.movendo = false
        this.posicaoX = (this.ctx.canvas.width / 2) - (this.largura / 2)
        this.posicaoY = (this.ctx.canvas.height / 2) - (this.altura / 2)
        pad.posicaoX = 0
        pad.posicaoY = (this.ctx.canvas.height / 2) - (pad.altura / 2)
        cpu.posicaoX = (this.ctx.canvas.width) - (cpu.largura)
        cpu.posicaoY = (this.ctx.canvas.height / 2) - (cpu.altura / 2)
        //this.direcaoBolaX = -1
    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura)
    }
}