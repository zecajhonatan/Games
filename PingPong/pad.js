class Pad {
    constructor(ctx, teclado) {
        this.ctx = ctx
        this.teclado = teclado
        this.velocidade = 3
        this.largura = 10
        this.altura = 100
        this.posicaoX = 0
        this.posicaoY = (this.ctx.canvas.height / 2) - (this.altura / 2)
    }
    gerenciar() {
        if (this.teclado.esquerda) {
            if (this.posicaoX > 0)
                this.posicaoX -= this.velocidade
        }
        if (this.teclado.direita) {
            if (this.posicaoX < this.ctx.canvas.width / 2 - this.largura)
                this.posicaoX += this.velocidade
        }
        if (this.teclado.cima) {
            if (this.posicaoY > 0)
                this.posicaoY -= this.velocidade
        }
        if (this.teclado.baixo) {
            if (this.posicaoY < this.ctx.canvas.height - this.altura)
                this.posicaoY += this.velocidade
        }
    }

    desenhar() {
        this.gerenciar()
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(this.posicaoX, this.posicaoY, this.largura, this.altura)
    }
}