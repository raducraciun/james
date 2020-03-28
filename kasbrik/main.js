var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var ball = {
  radius: 10,
  x: canvas.width/2,
  y: canvas.height - 30,
  dx: 2, // Incréments en x et y
  dy: -2
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

var paddle = {
  width: 75,
  height: 10,
  x: (canvas.width - 75)/2,
  dx: 7 // Incrément en x
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

var pressedKey = {
  left: false,
  right: false
};

function keyDownHandler(event) {
  if (event.keyCode == 37) {
    pressedKey.left = true;
  }
  else if (event.keyCode == 39) {
    pressedKey.right = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode == 37) {
    pressedKey.left = false;
  }
  else if (event.keyCode == 39) {
    pressedKey.right = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var brickColCount = 7, brickRowCount = 3;

var bricks = []; // Tableau 2D de briques
for (var c = 0; c < brickColCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      width: 75,
      height: 20,
      padding: 10,
      offsetTop: 30,
      offsetLeft: 30,
      color: "#0095DD"
    };
  }
}

function drawBricks() {
  for (var c = 0; c < brickColCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var brick = bricks[c][r]; // Référence
      var x = c*(brick.width + brick.padding) + brick.offsetLeft;
      var y = r*(brick.height + brick.padding) + brick.offsetTop;
      brick.x = x;
      brick.y = y;
      ctx.beginPath();
      ctx.rect(x, y, brick.width, brick.height);
      ctx.fillStyle = brick.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw() { // Boucle de jeu
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawBricks();
  drawBall();
  drawPaddle();

  /* Animations de la balle */
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) { // Collision horizontale
    ball.dx = -ball.dx; // Changement de direction horizontale
  }
  if (
      (ball.y - ball.radius < 0) || // Collision avec le bord haut
        (ball.x > paddle.x && // Collision avec le plateau
        (ball.x < paddle.x + paddle.width) &&
        (ball.y + ball.radius > canvas.height - paddle.height)
    )) {
      ball.dy = -ball.dy; // Changement de direction verticale
  }
  if (ball.y + ball.radius > canvas.height) { // Fin du jeu
    alert("GAME OVER");
    document.location.reload();
  }

  /* Animations du plateau */
  if (pressedKey.left && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
  else if (pressedKey.right && (paddle.x + paddle.width) < canvas.width) {
    paddle.x += paddle.dx;
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
