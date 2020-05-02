<template>
  <div class="container-fluid bgColorCustom">
    <div class="row justify-content-center">
      <div class="col-sm-12 my-3 text-center">
        <h3 class="text-center mb-3">Brick breaker!</h3>
        <canvas id="breakoutcanvas" width="800" height="600"></canvas>
        <div class="d-flex justify-content-center">
          <div v-if="!isStart" @click="startGame()" class="btn btn-link c-pointer mt-3">Start game</div>
          <template v-else>
            <div @click="resetGame()" class="btn btn-link c-pointer mt-3">End game</div>
            <div @click="pauseGame()" class="btn btn-link c-pointer mt-3">Pause</div>
          </template>
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

  3.  startGame & resetGame click handler
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

  5.  on moveBall function, add role for reverse the ball direction when it hit the wall
      and then add role for reverse the ball direction when it hit the paddle as well
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

        this.elementSetup();
        this.updateCanvas();
      },

      elementSetup() {
        // Ball config
        this.element.ball.x = this.vueCanvas.width / 2;
        this.element.ball.y = this.vueCanvas.height / 2;

        // Paddle config
        this.element.paddle.x = this.vueCanvas.width / 2 - 40;
        this.element.paddle.y = this.vueCanvas.height - 20;

        // Brick config
        this.element.brickConfig.bricks = [];
        for(let i = 0; i < this.element.brickConfig.rowCount; i++) {
          this.element.brickConfig.bricks[i] = [];
          for(let j = 0; j < this.element.brickConfig.columnCount; j++) {
            // x & y position
            const x = i * (this.element.brick.w + this.element.brick.padding) + this.element.brick.offsetX;
            const y = j * (this.element.brick.h + this.element.brick.padding) + this.element.brick.offsetY;
            this.element.brickConfig.bricks[i][j] = { x, y, ...this.element.brick }
          }
        }
      },

      drawBall() {
        // Draw ball
        this.vueCanvas.beginPath();
        this.vueCanvas.arc(this.element.ball.x, this.element.ball.y, this.element.ball.size, 0, Math.PI * 2);
        this.vueCanvas.fillStyle = 'navy';
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
            ( this.element.ball.dx > 0 && this.element.ball.x + this.element.ball.size > this.vueCanvas.width ) ||  // right wall
            ( this.element.ball.dx < 0 && this.element.ball.x - this.element.ball.size < 0) // left wall
          ) {
            this.element.ball.dx *= -1 // means ball.dx = ball.dx * -1 (to make the ball direction reverse we need to * negative)
        }

        // wall reverse ball (top / bottom)
        if
          (
            this.element.ball.y + this.element.ball.size > this.vueCanvas.height || // bottom wall
            this.element.ball.y - this.element.ball.size < 0  // top wall
          ) {
            this.element.ball.dy *= -1 
            // means ball.dx = ball.dx * -1 (to make the ball direction reverse we need to * negative)
        }

        // reverse ball when touch the paddle
        if
          (
            this.element.ball.x + this.element.ball.size > this.element.paddle.x &&   // bottom right corner of ball x position more than top left corner of paddle
            this.element.ball.x - this.element.ball.size < this.element.paddle.x + this.element.paddle.w &&  // center of ball x position less than right corner of paddle
            this.element.ball.y + this.element.ball.size >= this.element.paddle.y &&  // bottom of the ball touch the top paddle
            this.element.ball.y + this.element.ball.size <= this.element.paddle.y + this.element.paddle.h / 2 // bottom of the ball can't be too far in a bottom
          ) {
            this.element.ball.dy = -this.element.ball.speed;
        }

        // Brick role
        this.element.brickConfig.bricks.forEach(column => {
          column.forEach(brick => {
            if (brick.visible) {
              if (
                this.element.ball.x + this.element.ball.size > brick.x && // left brick side
                this.element.ball.x - this.element.ball.size < brick.x + brick.w && // right brick side
                this.element.ball.y + this.element.ball.size > brick.y && // top brick side
                this.element.ball.y - this.element.ball.size < brick.y + brick.h // bottom brick side
              ) {
                this.element.ball.dy *= -1;
                brick.visible = false;
                this.element.score += 10;
              }
            }
          })
        })

        // Score role
        if (this.element.ball.y + this.element.ball.size >= this.vueCanvas.height - 5) {
          this.resetGame();
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
      },

      pauseGame() {
        window.removeEventListener('keydown', this.keyDownListener);
        window.removeEventListener('keyup', this.keyUpListener);
        this.isStart = false;
      },

      resetGame() {
        window.removeEventListener('keydown', this.keyDownListener);
        window.removeEventListener('keyup', this.keyUpListener);
        this.isStart = false;
        this.element.score = 0;

        // always clear canvas everytime we start draw / update
        this.vueCanvas.clearRect(0,0, this.vueCanvas.width, this.vueCanvas.height)
        this.elementSetup();
        this.element.ball.dx = 4;
        this.element.ball.dy = -4;
        this.element.ball.speed = 4;
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