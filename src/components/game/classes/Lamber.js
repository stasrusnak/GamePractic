const amounts = [20, 30, 40];
export default class Lamber {
  constructor(canvas,x,y,  width, height, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx
  }

  draw() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('lamb', this.x + 15, this.y + 25);
  }

  clear() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}
