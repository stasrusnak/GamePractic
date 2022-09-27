const amounts = [20, 30, 40];
export default class Enemy {
  constructor(canvas, cellSize, cellGrid, ctx) {
    // this.x = Math.random() * (canvas.width - cellSize);
    // this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;

    this.x = 550;
    this.y = 40;
    this.width = cellSize * 0.6;
    this.height = cellSize * 0.6;
    this.ctx = ctx
    this.amount = amounts[Math.floor(Math.random() * amounts.length)];
  }
  draw(){
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(this.amount, this.x + 15, this.y + 25);
  }
}
