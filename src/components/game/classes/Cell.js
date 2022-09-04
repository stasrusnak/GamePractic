export default class Cell {
  constructor(x, y, cellSize, ctx, mouse) {
    this.x = x
    this.y = y
    this.width = cellSize
    this.height = cellSize
    this.ctx = ctx
    this.mouse =mouse
  }
  collision(first, second) {
    if (!(first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y))
    {
      return true
    }
  }
  draw() {
    if(this.mouse.x && this.mouse.y && this.collision(this,this.mouse)){
      this.ctx.strokeStyle = 'black'
      this.ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
