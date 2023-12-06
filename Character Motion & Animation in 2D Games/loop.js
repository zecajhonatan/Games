window.addEventListener("load", function () {
  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")

  canvas.width = 600
  canvas.height = 800
  ctx.strokeStyle = "#fff"
  ctx.lineWidth = 3

  class Robot {
    constructor(canvas) {
      
      this.canvas = canvas

      this.x = this.canvas.width * 0.5; // 300
      this.y = this.canvas.height * 0.5; // 400

      this.centerX = this.x // 300
      this.centerY = this.y // 400

      this.radius = 80
      this.angle = 0
      this.frameX = 0
      this.maxFrame = 75
      this.spriteWidth = 370
      this.spriteHeight = 393

      this.movimentAngle = 0

      this.eye1Radius = this.radius * 0.4 // 32
      this.eye2Radius = this.radius * 0.65 // 52

      this.eye1Distance = this.eye1Radius // 32
      this.eye2Distance = this.eye2Radius // 52

      this.tracking = false

      this.bodyImage = document.querySelector("#body")
      this.bodySprite = document.querySelector("#bodySprite")
      this.eye1Image = document.querySelector("#eye1")
      this.eye2Image = document.querySelector("#eye2")
      this.reflectionImage = document.querySelector("#reflection")
      this.detectorLight = document.querySelector("#detectorLight")

      this.mouse = {
        x: 0,
        y: 0
      }

      this.canvas.addEventListener("mousemove", e => {
        this.mouse.x = e.offsetX
        this.mouse.y = e.offsetY
        this.tracking = true
      })

      this.canvas.addEventListener("mouseleave", e => {
        this.tracking = false
      })
    }

    draw(ctx) {

      ctx.drawImage(this.bodySprite, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x * 0.5, this.y - this.bodyImage.height * 0.5 - 53, this.spriteWidth, this.spriteHeight)

      //eye1
      ctx.drawImage(this.eye1Image, this.x + Math.cos(this.angle) * this.eye1Radius - this.eye1Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye1Radius - this.eye1Image.height * 0.5)
      // ctx.beginPath()
      // ctx.arc(this.x + Math.cos(this.angle) * this.radius * 0.4, this.y + Math.sin(this.angle) * this.radius * 0.4, this.radius * 0.6, 0, Math.PI * 2)
      // ctx.stroke()
      //eye2
      ctx.drawImage(this.eye2Image, this.x + Math.cos(this.angle) * this.eye2Radius - this.eye2Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye2Radius - this.eye2Image.height * 0.5)
      // ctx.beginPath()
      // ctx.arc(this.x + Math.cos(this.angle) * this.radius * 0.6, this.y + Math.sin(this.angle) * this.radius * 0.6, this.radius * 0.3, 0, Math.PI * 2)
      // ctx.stroke()
      ctx.drawImage(this.reflectionImage, this.x * 0.5 + 70, this.y - this.bodyImage.height * 0.5 + 110)
      //detectorLight

      if (this.tracking)
        ctx.drawImage(this.detectorLight, this.x * 0.5 + 77, this.y - this.bodyImage.height * 0.5 + 110 - 185)



    }

    update() {
      // angle
      const dx = this.mouse.x - this.x
      const dy = this.mouse.y - this.y

      const distance = Math.hypot(dx, dy) // VERIFICA A DISTANCIA ENTRE O CENTRO DO OLHO COM A POSIÇÃO DO MOUSE
      this.angle = Math.atan2(dy, dx) // VERIFICA O ANGULO ENTRE O CENTRO DO OLHO COM A POSIÇÃO DO MOUSE

      if (distance <= this.eye1Distance * 2.5) {
        this.eye1Radius = distance * 0.4
        this.eye2Radius = distance * 0.65
      } else if (this.tracking) {
        this.eye1Radius = this.eye1Distance
        this.eye2Radius = this.eye2Distance

      } else {
        this.eye1Radius = this.eye1Distance * Math.cos(this.movimentAngle)
        this.eye2Radius = this.eye2Distance * Math.cos(this.movimentAngle)
      }

      // this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0

      this.movimentAngle += 0.005

      this.x = this.centerX + Math.cos(this.movimentAngle * 3) * 80
      this.y = this.centerY + Math.sin(this.movimentAngle * 0.5) * 150

      if (this.movimentAngle > Math.PI * 4) {
        this.movimentAngle = 0
        console.log("Reset")
      }


    }
  }

  let robot = new Robot(canvas)

  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

  
    robot.draw(ctx)
    robot.update()
    
    requestAnimationFrame(animation)
  }
  animation()












})
