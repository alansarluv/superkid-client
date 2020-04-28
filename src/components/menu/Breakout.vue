<template>
  <div class="container-fluid bgColorCustom">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Breakout!</h3>
        <canvas id="breakoutcanvas" width="800" height="600"></canvas>
        <div class="d-flex justify-content-center">
          <div @click="startGame()" class="btn btn-link c-pointer mt-3">start game</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        vueCanvas: null,
        element: {
          ball: {
            x: 0,
            y: 0,
            size: 10,
            speed: 4,
            dx: 4,    // direction move in x line
            dy: -4    // direction move in y line
          },
          paddle: {
            x: 0,
            y: 0,
            w: 80,
            h: 10,
            speed: 8,
            dx: 0,    // direction move only in x line & cant move in y line
          },
          score: 0
        }
      }
    },
    methods: {
      initElement() {
        // Canvas
        const c = document.getElementById("breakoutcanvas");
        this.vueCanvas = c.getContext("2d");
        this.vueCanvas.width = 800;
        this.vueCanvas.height = 600;

        // Ball config
        this.element.ball.x = this.vueCanvas.width / 2;
        this.element.ball.y = this.vueCanvas.height / 2;

        // Paddle config
        this.element.paddle.x = this.vueCanvas.width / 2 - 40;
        this.element.paddle.y = this.vueCanvas.height - 20;

        this.drawCanvas();
      },
      drawBall() {
        // Draw ball
        this.vueCanvas.beginPath();
        this.vueCanvas.arc(this.element.ball.x, this.element.ball.y, this.element.ball.size, 0, Math.PI * 2);
        this.vueCanvas.fillStyle = '#0095dd';
        this.vueCanvas.fill();
        this.vueCanvas.closePath();
      },
      drawPaddle() {
        // Draw ball
        this.vueCanvas.beginPath();
        this.vueCanvas.rect(
          this.element.paddle.x,
          this.element.paddle.y,
          this.element.paddle.w,
          this.element.paddle.h
          );
        this.vueCanvas.fillStyle = '#0095dd';
        this.vueCanvas.fill();
        this.vueCanvas.closePath();
      },
      drawScore() {
        this.vueCanvas.font = '20px Arial';
        this.vueCanvas.fillText(`Score: ${this.element.score}`, this.vueCanvas.width - 100, 30);
      },
      drawCanvas() {
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
      },

      startGame() {
      },
    },
    computed: {
    },
    mounted(){
      this.initElement();
    }
  }
</script>
<style lang="scss">
  .bgColorCustom {
    background-color: #ffc40c;
  }
  #breakoutcanvas {
    background-color: #8588ad4f;
    display: block;
    border-radius: 4px;
    margin: auto;
  }
</style>