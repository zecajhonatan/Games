class Cpu {
    constructor(ctx, bola) {
        this.ctx = ctx
        this.bola = bola
        this.velocidade = 4
        this.largura = 10
        this.altura = 100
        this.posicaoX = (this.ctx.canvas.width) - (this.largura)
        this.posicaoY = (this.ctx.canvas.height / 2) - (this.altura / 2)
        this.inicioX = this.posicaoX
        this.inicioY = this.posicaoY
        this.meioCpu = Math.random() * this.altura
    }

    gerenciar() {
        if (this.bola.direcaoBolaX > 0 && this.bola.posicaoX > this.ctx.canvas.width / 2) {
            // REBATER A BOLA
            if (this.bola.posicaoY + (this.bola.altura / 2) > this.posicaoY + this.meioCpu) {
                this.posicaoY += this.velocidade
            }
            if (this.bola.posicaoY + (this.bola.altura / 2) < this.posicaoY + this.meioCpu) {
                this.posicaoY -= this.velocidade
            }
            if (this.bola.posicaoX + this.bola.largura < this.posicaoX) {
                this.posicaoX -= this.velocidade
            }
        } else {
            // IR PARA POSICÃO DE ORIGEM
            if (this.posicaoY > this.inicioY) {
                this.posicaoX -= this.velocidade
            }
            if (this.posicaoY < this.inicioY) {
                this.posicaoY += this.velocidade
            }
            if (this.posicaoX > this.inicioX) {
                this.posicaoX -= this.velocidade
            }
            if (this.posicaoX < this.inicioX) {
                this.posicaoX += this.velocidade
            }
        }
        bola
        // COLISÃO COM O JOGADOR

        if (
            (this.posicaoX <= this.bola.posicaoX + this.bola.largura && this.posicaoX + this.largura >= this.bola.posicaoX)
            &&
            (this.posicaoY + this.altura >= this.bola.posicaoY && this.posicaoY <= this.bola.posicaoY + this.bola.altura)
        ) {
            this.bola.direcaoBolaX = -1
            this.bola.direcaoBolaY = ((this.bola.posicaoY + (this.bola.altura / 2)) - (this.posicaoY + (this.altura / 2))) / 20
            this.meioCpu = Math.random() * this.altura
        }

    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura)
    }
}