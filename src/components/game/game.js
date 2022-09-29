import Cell from "./classes/Cell";
import Defender from "./classes/Defender";
import Enemy from "./classes/Enemy";
import Resource from "./classes/Resource";
import Lamber from "./classes/Lamber";
import {mapGetters} from "vuex";


const cellSize = 100;
const cellGrid = 3;
const gameGrid = []
const lumber ={
  x :650,
  y :40,
  width :cellSize * 0.6,
  height :cellSize * 0.6
}
let mouse = {}


export default {
  name: "game",
  data() {
    return {
      fps: 0,
      frame: 0,
      times: [],
      canvas: null,
      ctx: null,
      width: 900,
      height: 600,
      gameOver: false,
      numberOfResources: 400,
      score: 0,
      winningScore: 1500,
      defenders: [],
      enemies: [],
      resources: [],
      lumbers: [],
      enemiesInterval: 600,
      income: 10,
      incomePrice: 100,
      enemyPosition: [],
      canvasPosition: null,
      cellSize,
      cellGrid,
      gameGrid,
      controlsBar: {
        width: null,
        height: null,
      },
      projectiles: [],
      move: false
    }
  },
  computed: {
    // ...mapGetters({
    //   projectiles: 'projectiles',
    // }),

  },
  methods: {
    handleMouse() {
      mouse = {
        x: 10,
        y: 10,
        width: 0.1,
        height: 0.1,
        clicked: false,
      }
      this.canvasPosition = this.canvas.getBoundingClientRect()

      this.canvas.addEventListener('mousedown', () => {
        mouse.clicked = true
      })
      this.canvas.addEventListener('mouseup', () => {
        mouse.clicked = false
      })


      this.canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x - this.canvasPosition.left
        mouse.y = e.y - this.canvasPosition.top
      })
      this.canvas.addEventListener('mouseleave', () => {
        mouse.x = undefined,
        mouse.y = undefined
      })
      this.canvas.addEventListener('click', () => {
        this.move = true
        const gridPosX = mouse.x - (mouse.x % cellSize) + cellGrid
        const gridPosY = mouse.y - (mouse.y % cellSize) + cellGrid
        if (gridPosY < cellSize) return
        for (let i = 0; i < this.defenders.length; i++) {
          if (this.defenders[i].x === gridPosX && this.defenders[i].y === gridPosY) {
            return;
          }
        }

        let defenderCost = 100;
        if (this.numberOfResources >= defenderCost) {
          this.defenders.push(new Defender(gridPosX, gridPosY, cellSize, cellGrid, this.ctx))
          this.numberOfResources -= defenderCost
        }



      })

    },
    handleGameLumber() {

      this.ctx.fillText('Lumber: ' + this.score, 550, 40)

      if (this.frame % 200 === 0){
        this.lumbers.push(new Lamber(this.canvas,lumber.x,lumber.y,lumber.width,lumber.height,this.ctx));
        this.numberOfResources+=this.income
      }
      for (let i = 0; i <  this.lumbers.length; i++){
        this.lumbers[i].draw();
        if (mouse.x && mouse.y && new Cell().collision( this.lumbers[i], mouse) && mouse.clicked){
          if(this.numberOfResources>this.incomePrice){
            console.log('12312')
            this.numberOfResources-= this.incomePrice
            this.income+= Math.floor(this.income*0.5)
            this.lumbers.splice(i, 1);
          }

        }
      }
    },

    handleGameStatus() {
      this.ctx.fillStyle = 'gold'
      this.ctx.font = '20px Arial'
      this.ctx.fillText('Gold: ' + this.numberOfResources, 20, 25)
      this.ctx.fillText('Score: ' + this.score, 20, 75)

      if(this.score > this.winningScore && this.enemies.length ===0){
        this.ctx.fillStyle='black';
        this.ctx.font = '60px Arial'
        this.ctx.fillText('LEVEL COMPLETE', 130, 300)
        this.ctx.font = '20px Arial'
        this.ctx.fillText('You win : ' + this.score, 134, 340)
      }
    },
    handleGameGrid() {
      for (let i = 0; i < this.gameGrid.length; i++) {
        this.gameGrid[i].draw()
      }
    },
    handleDefenders() {

      for (let i = 0; i < this.defenders.length; i++) {
        this.defenders[i].draw()
        this.defenders[i].update()
        if(this.enemyPosition.indexOf(this.defenders[i].y) !== -1){
          this.defenders[i].shooting = true
        }else {
          this.defenders[i].shooting = false
        }

        if (this.defenders[i].projectiles.length > 0) {
          this.projectiles = this.defenders[i].projectiles
        }

        for (let j = 0; j < this.enemies.length; j++) {
          if (this.defenders[i] && new Cell().collision(this.defenders[i], this.enemies[j])) {
            this.enemies[j].movement = 0
            this.defenders[i].health -= 0.2;
          }
          if (this.defenders[i] && this.defenders[i].health <= 0) {
            this.defenders.splice(i, 1)
            i--;
            this.enemies[j].movement = this.enemies[j].speed
          }
        }

      }
    },

    handleResource(){

      if (this.frame % 500 === 0 && this.score < this.winningScore){
        this.resources.push(new Resource(this.canvas, cellSize, cellGrid, this.ctx));
      }

      for (let i = 0; i <  this.resources.length; i++){
        this.resources[i].draw();
        if (this.resources[i] && mouse.x && mouse.y && new Cell().collision(this.resources[i], mouse) && mouse.clicked){

          console.log('handleResource')
          this.numberOfResources += this.resources[i].amount;
          this.resources.splice(i, 1);
          i--;
        }
      }
    },
    handleProjectiles() {
      for (let i = 0; i < this.projectiles.length; i++) {
        this.projectiles[i].update()
        this.projectiles[i].draw()
        for (let j = 0; j < this.enemies.length; j++) {
          if (this.projectiles[i] && this.enemies[j] && new Cell().collision(this.projectiles[i], this.enemies[j])) {
             this.enemies[i].health -= this.projectiles[i].power;
            this.projectiles.splice(i, 1)
            i--;
          }
        }
        if (this.projectiles[i] && this.projectiles[i].length >= 0 && this.projectiles[i].x > this.canvas.width - cellSize) {
          this.projectiles[i].splice(i, 1)
          i--;
        }
      }
    },
    handleEnemies() {
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].update()
        this.enemies[i].draw()
        if (this.enemies[i].x < 0) this.gameOver = true

        if (this.enemies[i].health <= 0) {
          let gaindeResources = this.enemies[i].maxHealth/10
          this.numberOfResources += gaindeResources
          this.score += this.numberOfResources
          const findIndex = this.enemyPosition.indexOf(this.enemies[i].y)
          this.enemyPosition.splice(findIndex,1)


          // console.log(this.gameGrid)


          this.enemies.splice(i, 1)
          i--;
          // console.log(this.enemyPosition)
        }

      }
      if (this.frame % this.enemiesInterval === 0 && this.score < this.winningScore) {
        let verticalPos = Math.floor(Math.random() * 5 + 1) * cellSize + cellGrid
        this.enemies.push(new Enemy(this.canvas, verticalPos, cellSize, cellGrid, this.ctx))
        this.enemyPosition.push(verticalPos)
        if (this.enemiesInterval > 320) this.enemiesInterval -= 100
      }
    },

    createGrid(ctx) {
      for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
        for (let x = 0; x < this.canvas.width; x += this.cellSize) {
          this.gameGrid.push(new Cell(x, y, this.cellSize, ctx, mouse))
        }
      }
    },

    init() {
      this.canvas = this.$refs['game'];
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext("2d");
      this.controlsBar = {
        width: this.canvas.width,
        height: this.cellSize
      }


    },

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#42a7f5'
      this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
      this.createGrid(this.ctx)
      this.handleGameGrid()
      this.handleResource()
      this.handleDefenders()
      this.handleProjectiles()
      this.handleEnemies()
      this.handleGameStatus()
      this.handleGameLumber()
      this.frame++
      this.gameGrid = []
      if (!this.gameOver) requestAnimationFrame(this.animate)


    },
    getFps() {
      window.requestAnimationFrame(() => {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
          this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.getFps();
      });
    },
  },

  mounted() {
    this.getFps();
    this.init();
    this.handleMouse();
    this.animate()
  },

}



