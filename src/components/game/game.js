const cellSize = 100;
const cellGrid = 3;
const gameGrid = []
import Cell from "./classes/Cell";
import Defender from "./classes/Defender";

let mouse = {}

export default {
  name: "game",
  data() {
    return {
      canvas: null,
      ctx: null,
      name: 'Game',
      width: 900,
      height: 600,
      numberOfResources: 400,
      defenders: [],
      canvasPosition: null,
      rendering: false,
      request: '', // requestAnimationFrame
      btnToggle: true,
      cellSize,
      cellGrid,
      gameGrid,
      controlsBar: {
        width: null,
        height: null,
      }
    }
  },
  computed: {
    canvasss() {
      return this.$refs['game'];
    },
    ctxxx() {
      return this.canvas.getContext("2d");
    }
  },


  methods: {

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


    handleMouse() {
      mouse = {
        x: 10,
        y: 10,
        width: 0.1,
        height: 0.1,
      }
      this.canvasPosition = this.canvas.getBoundingClientRect()
      this.canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x - this.canvasPosition.left
        mouse.y = e.y - this.canvasPosition.top
      })
      this.canvas.addEventListener('mouseleave', () => {
        mouse.x = undefined,
          mouse.y = undefined
      })
      this.canvas.addEventListener('click', () => {
        const gridPosX = mouse.x - (mouse.x % cellSize)
        const gridPosY = mouse.y - (mouse.y % cellSize)
        if (gridPosY < cellSize) return
        let defenderCost =100;
        if(this.numberOfResources > defenderCost){
          this.defenders.push(new Defender(gridPosX,gridPosY,cellSize,this.ctx))
          this.numberOfResources-=defenderCost
        }
      })

    },

    handleGameGrid() {
      for (let i = 0; i < this.gameGrid.length; i++) {
        this.gameGrid[i].draw()
      }
      console.log(this.gameGrid)
    },
    handleDefenders() {
      for (let i = 0; i < this.defenders.length; i++) {
        this.defenders[i].draw()
      }
      console.log(this.defenders)
    },

    createGrid(ctx) {
      for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
        for (let x = 0; x < this.canvas.width; x += this.cellSize) {
          this.gameGrid.push(new Cell(x, y, this.cellSize, ctx, mouse))
        }
      }
    },

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#42a7f5'
      this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
      this.createGrid(this.ctx)
      this.handleGameGrid()
      this.handleDefenders()

      requestAnimationFrame(this.animate)

    }

  },

  mounted() {


    this.init();
    this.handleMouse();
    this.animate()
  }
}



