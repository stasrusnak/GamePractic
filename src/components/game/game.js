export default {
  name: "game",
  data() {
    const cellSize = 100;
    const cellGrid = 3;
    const gameGrid = []


    return {
      canvas: null,
      ctx: null,
      name: 'Game',
      width: 900,
      height: 600,
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

    handleGameGrid() {
      for (let i = 0; i < this.gameGrid.length; i++) {
        this.gameGrid[i].draw()
      }
      console.log(this.gameGrid)
    },

    createGrid(ctx) {

      //
      // console.log(this.controlsBar.width )
      // console.log(this.controlsBar.height)
      for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
        for (let x = 0; x < this.canvas.width; x += this.cellSize) {
          this.gameGrid.push(new Cell(x, y, this.cellSize, ctx))
        }
      }
    },

    animate() {
      //
      // console.log(this.controlsBar.width )
      // console.log(this.controlsBar.height)

      this.ctx.fillStyle = 'green'
      this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);

      this.createGrid(this.ctx)
      this.handleGameGrid()


    }

  },
  mounted() {


    this.init();
    this.animate();

    requestAnimationFrame(this.animate)
  }
}

class Cell {
  constructor(x, y, cellSize, ctx) {
    this.x = x
    this.y = y
    this.width = cellSize
    this.height = cellSize
    this.ctx = ctx
  }

  draw() {
    this.ctx.strokeStyle = 'black'
    this.ctx.strokeRect(this.x, this.y, this.width, this.height)
  }
}
