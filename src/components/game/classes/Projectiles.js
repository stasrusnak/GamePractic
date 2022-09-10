export default class Projectiles {
  constructor(x, y, ctx) {
    this.x = x
    this.y = y
    this.width = 10
    this.height = 10
    this.speed = 5
    this.ctx = ctx
  }

  update() {
    this.x += this.speed;
  }

  draw() {
    this.ctx.fillStyle = 'black'
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.width, 0, Math.PI*2)
    this.ctx.fill()
  }

}
