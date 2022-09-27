import Projectiles from "./Projectiles";
import store from '../../../store'

export default class Defender {
  constructor(x, y, cellSize,cellGrid, ctx) {
    this.x = x
    this.y = y
    this.width = cellSize - cellGrid * 2
    this.height = cellSize - cellGrid * 2
    this.shooting = true
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
  update(){
    if(this.shooting){
      this.timer++;
      if(this.timer % 100 === 0 ){
        this.projectiles.push(new Projectiles( this.x+50, this.y+50, this.ctx))
        // store.commit('PROJECTILES',new Projectiles( this.x+50, this.y+50, this.ctx))
      }
    }else{
      this.timer = 0
    }


  }
}
