class Placar {
    constructor(ctx) {
        this.ctx = ctx
        this.direita = this.ctx.canvas.width
        this.margem1 = 100
        this.margem = 30
        this.largura = 100
        this.posicaoX = (this.ctx.canvas.width / 2) - (this.largura / 2)
        this.posicaoY = (this.ctx.canvas.height / 2) - (this.altura / 2)
    }

    desenhar() {
        this.ctx.font = '60px arial'
        this.ctx.fillStyle = '#000'
        this.ctx.fillText(pontuacaoJ1 ,this.margem1, this.margem + 70, this.largura)
        this.ctx.fillText(pontuacaoJ2 ,this.direita - this.largura - this.margem, this.margem + 70, this.largura)
    }
}