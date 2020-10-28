var canvas = document.getElementById("myCanvas"); // Link to the canvas
var ctx = canvas.getContext("2d"); // Set to 2D for x,y dimentions

var ballRadius = 10; // Ball's radius

var x = canvas.width / 2; // Ball's starting point horizontally to center
var y = canvas.height - 30; // Ball's starting point vertically right above bottom

var dx = 1; // Moving speed horizontally
var dy = -1; // Moving speed vertically

var paddleHeight = 10; // Paddle height
var paddleWidth = 75; // Paddle width

var paddleX = (canvas.width - paddleWidth) / 2; // Paddle horizontal starting point

// Check for arrow keys to move paddle
var rightPressed = false;
var leftPressed = false;

// Set the brick board dimentions (rows, columns)
var brickRowCount = 5;
var brickColumnCount = 3;

// Brick dimentions
var brickWidth = 75;
var brickHeight = 20;

// Spacing between bricks
var brickPadding = 10;

// Space brick board on left and right
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Track of the game
var score = 0;
var lives = 3;

// Setup 2D array for bricks
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }; // add a status to track if it has been hit
  }
}

// Game controls tracking
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Left key controls
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

// Right key controls
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Mouse controls
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Detect the ball colliding with bricks
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      // Avoid checking for bricks that were already hit
      if (b.status == 1) {
        // Check if the ball is making contact with the brick
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy; // Reverse ball direction
          b.status = 0; // set the brick to hit
          score++; // add to the score

          // Win when the score is equal to the number of bricks
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Set ball style and position
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Set paddle style and position
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Add all the bricks that haven't been destroyed yet
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Add score label
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// Add a remaining lives label
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  // setup board canvas size
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw / update brick board
  drawBricks();

  // Draw / update ball style and position
  drawBall();

  // Draw paddle
  drawPaddle();

  // Update score
  drawScore();

  // update lives
  drawLives();

  // Keep checking for the ball colliding with other shapes
  collisionDetection();

  // Reverse ball direction when at canvas horizontally
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Reverse ball direction when at canvas Vertically
  if (y + dy < ballRadius) {
    dy = -dy;
  } // If the ball is elsewhere above the bottom line
  else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        // Reset all values
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1;
        dy = -1;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

  // Animate the difference
  requestAnimationFrame(draw);
}

// MARK: Main function
draw();
