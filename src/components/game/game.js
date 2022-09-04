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
      fps: 0,
      times: [],
      canvas: null,
      ctx: null,
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
      },

      previousElapsed: null,
      gameLoop: null,
      delta: null,
      move: false
    }
  },
  computed: {},


  methods: {

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
        this.move = true
        const gridPosX = mouse.x - (mouse.x % cellSize)
        const gridPosY = mouse.y - (mouse.y % cellSize)
        if (gridPosY < cellSize) return
        for (let i = 0; i < this.defenders.length; i++) {
          if (this.defenders[i].x === gridPosX && this.defenders[i].y === gridPosY) {
            return;
          }
        }

        let defenderCost = 100;
        if (this.numberOfResources >= defenderCost) {
          this.defenders.push(new Defender(gridPosX, gridPosY, cellSize, this.ctx))
          this.numberOfResources -= defenderCost
        }
      })

    },
    handleGameStatus() {
      this.ctx.fillStyle = 'gold'
      this.ctx.font = '20px Arial'
      this.ctx.fillText('Gold: ' + this.numberOfResources, 20, 55)
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
      this.handleDefenders()
      this.handleGameStatus()
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

  watch:{
    move(value) {
    console.log(value)
    if (value) {
      requestAnimationFrame(this.animate)
      this.move = false
    }
  }
  },
  mounted() {
    this.getFps();
    this.init();
    this.handleMouse();
    this.animate()

  }
}



