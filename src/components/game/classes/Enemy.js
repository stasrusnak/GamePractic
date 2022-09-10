export default class Enemy {
  constructor(canvas,verticalPos, cellSize, ctx) {
    this.x = canvas.width
    this.y = verticalPos
    this.width = cellSize
    this.height = cellSize
    this.speed = Math.random()*0.4+0.7
    this.movement = this.speed
    this.health=100
    this.maxHealth = this.health
    this.ctx = ctx
  }
  update(){
    this.x -= this.movement
  }

  draw() {
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.fillStyle = 'black'
    this.ctx.font = '30px Arial'
    this.ctx.fillText(Math.floor(this.health),this.x+15,this.y+30)
  }

}
