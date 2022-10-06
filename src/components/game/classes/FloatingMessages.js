export default class FloatingMessages {
  constructor(value, x, y, size,color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size
    this.value = value
    this.ctx = ctx
    this.lifeSpan = 0
    this.color = color
    this.opacity = 1;
  }

  update(){
    this.y-=0.3
    this.lifeSpan+=1;
    this.opacity > 0.01 ? this.opacity-=0.01 : 1
  }
  draw(){
    this.ctx.globalAlpha = this.opacity
    this.ctx.fillStyle=this.color
    this.ctx.font = this.size+'px Arial'
    this.ctx.fillText(this.value,this.x,this.y)
    this.ctx.globalAlpha = 1
  }
}
