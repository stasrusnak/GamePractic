export default class Defender {
  constructor(x, y, cellSize, ctx) {
    this.x = x
    this.y = y
    this.width = cellSize
    this.height = cellSize
    this.shooting = false
    this.health = 100
    this.projectiles = []
    this.timer=0
    this.ctx = ctx
  }

  draw() {
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.fillStyle = 'gold'
    this.ctx.font = '20px Arial'
    this.ctx.fillText(Math.floor(this.health),this.x+15,this.y+30)
  }
}
