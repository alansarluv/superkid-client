<template>
  <div class="container-fluid bgColorCustom">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Breakout!</h3>
        <canvas id="breakoutcanvas" width="800" height="600"></canvas>
        <div class="d-flex justify-content-center">
          <div @click="startGame()" class="btn btn-link c-pointer mt-3">start game</div>
          <div @click="endgame()" class="btn btn-link c-pointer mt-3">end game</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// ======================= =========================== ==========================
// =======================      How The Code Work      ==========================
// ======================= =========================== ==========================
/*
  1.  Start from mounted : run initElement function.
      In this function, we define axis config for 
      the canvas, and all element (ball, paddle, bricks)
      then we call function called updateCanvas

  2.  updateCanvas has only 3 function but this 3 function is the main function
      - movePaddle
      - drawCanvas
      - requestAnimationFrame (callback to updateCanvas again)
      * movePaddle is a function to update position of paddle in x Axis line
        paddle in x will change as much as dx is change
        paddle in x can't move outside the left & right wall
      * drawCanvas is for draw each element on canvas
        each time we call this function, the canvas will be cleaned first
        then redraw based on latest changes on the config
      * requestAnimationFrame this is function for telling the browser that
        you wish to perform an animation and request the browser callback before the repaint
        the callback will call the updateCanvas function itself.

  3.  startGame & endGame click handler
      these function for activate and deactivate event listener to your arrow keydown and keyup
      when arrow left or arrow right is pressed, 
      the config of paddle.dx will be added as much as the speed we define
      arrowright for move paddle on plus coordinate of x
      arrowleft for move paddle on negative coordinate of x
      when keyup of arrow is detected, the dx will be set back to 0,
      means the movement is stop

  4.  add moveBall function inside updateCanvas.
      setup condition for only trigger this moveball only if flag isStart is true
      and if flag isStart is false then stop calling this moveBall function
*/


  export default {
    data() {
      return {
        vueCanvas: null,
        isStart: false,
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
            x: 90,
            y: 0,
            w: 80,
            h: 10,
            speed: 8,
            dx: 0,    // direction move only in x line & cant move in y line
          },
          brickConfig : {
            rowCount: 9,
            columnCount: 5,
            bricks: []
          },
          brick: {
            w: 70,
            h: 20,
            padding: 10,
            offsetX: 45,
            offsetY: 60,
            visible: true
          },
          score: 0
        }
      }
    },
    methods: {
      // ======================= =========================== ==========================
      // ======================= Draw element & init config  ==========================
      // ======================= =========================== ==========================
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

        // Brick config
        for(let i = 0; i < this.element.brickConfig.rowCount; i++) {
          this.element.brickConfig.bricks[i] = [];
          for(let j = 0; j < this.element.brickConfig.columnCount; j++) {
            // x & y position
            const x = i * (this.element.brick.w + this.element.brick.padding) + this.element.brick.offsetX;
            const y = j * (this.element.brick.h + this.element.brick.padding) + this.element.brick.offsetY;
            this.element.brickConfig.bricks[i][j] = { x, y, ...this.element.brick }
          }
        }        

        this.updateCanvas();
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
      drawBricks() {
        this.element.brickConfig.bricks.forEach(column => {
          column.forEach(brick => {
            this.vueCanvas.beginPath();
            this.vueCanvas.rect(
              brick.x,
              brick.y,
              brick.w,
              brick.h
            );
            this.vueCanvas.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            this.vueCanvas.fill();
            this.vueCanvas.closePath();
          })
        })
      },

      drawCanvas() {
        // always clear canvas everytime we start draw / update
        this.vueCanvas.clearRect(0,0, this.vueCanvas.width, this.vueCanvas.height)

        // start draw element
        this.drawBall();
        this.drawPaddle();
        this.drawScore();
        this.drawBricks();
      },

      // ======================= =========================== ==========================
      // ============ Method for update (moving element) and animation ================
      // ======================= =========================== ==========================
      movePaddle() {
        this.element.paddle.x += this.element.paddle.dx;

        // wall detection
        // cant move outside the wall (maximum on right side of the wall)
        if (this.element.paddle.x + this.element.paddle.w > this.vueCanvas.width) {
          this.element.paddle.x = this.vueCanvas.width - this.element.paddle.w;
        }
        // can't move to minus X (maximum on the left side of the wall)
        if (this.element.paddle.x < 0) {
          this.element.paddle.x = 0;
        }

      },

      updateCanvas() {
        this.movePaddle();

        // draw everything
        this.drawCanvas();

        // move the ball if start game is triggered
        if (this.isStart) {
          this.moveBall();
        }

        window.requestAnimationFrame(this.updateCanvas);
      },

      moveBall() {
        this.element.ball.x += this.element.ball.dx;
        this.element.ball.y += this.element.ball.dy;

        // wall reverse ball (right / left)
        if
          (
            this.element.ball.x + this.element.ball.size > this.vueCanvas.width ||
            this.element.ball.x + this.element.ball.size < 0
          ) {
            this.element.ball.dx *= -1 // means ball.dx = ball.dx * -1 (to make the ball direction reverse we need to * negative)
          }

        // wall reverse ball (top / bottom)
        if
          (
            this.element.ball.y + this.element.ball.size > this.vueCanvas.height ||
            this.element.ball.y + this.element.ball.size < 0
          ) {
            this.element.ball.dy *= -1 // means ball.dx = ball.dx * -1 (to make the ball direction reverse we need to * negative)
          }
      },

      // ======================= =========================== ==========================
      // =======================  game start & stop listener ==========================
      // ======================= =========================== ==========================
      keyDownListener() {
        if (event.key === "Right" || event.key === "ArrowRight") {
          this.element.paddle.dx = this.element.paddle.speed;
        } else if (event.key === "Left" || event.key === "ArrowLeft") {
          this.element.paddle.dx = -this.element.paddle.speed;
        }
      },
      keyUpListener() {
        if (
          event.key === "Right" ||
          event.key === "ArrowRight" ||
          event.key === "Left" ||
          event.key === "ArrowLeft"
        ) {
            this.element.paddle.dx = 0;
          }
      },

      startGame() {
        window.addEventListener('keydown', this.keyDownListener);
        window.addEventListener('keyup', this.keyUpListener);
        this.isStart = true;
        debugger  // eslint-disable-line no-debugger
      },
      endgame() {
        window.removeEventListener('keydown', this.keyDownListener);
        window.removeEventListener('keyup', this.keyUpListener);
        this.isStart = false;
      }
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