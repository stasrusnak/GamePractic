export default {
  name: "game",
  data() {
    const cellSize = 100;
    const cellGrid = 3;
    const gameGrid = []

    return {
      canvas:null,
      ctx:null,
      name: 'Game',
      cellSize,
      cellGrid,
      gameGrid,
      controlsBar: {
        width:null,
        height:null,
      }
    }
  },
  computed:{
    canvasss(){
      return  this.$refs['game'];
    },
    ctxxx(){
      return this.canvas.getContext("2d");
    }
  },

  methods:{
    init(){
      this.controlsBar = {
        width: this.canvas.width,
        height: this.cellSize
      }
    },


   animate(){
      //
      // console.log(this.canvasss)
      // console.log(this.ctxxx)

    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(0,0,this.controlsBar.width,this.controlsBar.height);
    requestAnimationFrame(this.animate)
  }

  },
  mounted() {
    this.canvas = this.$refs['game'];
    this.ctx = this.canvas.getContext("2d");

    this.init();
    this.animate();
  }
}
