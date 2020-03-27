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

function draw() { // Boucle de jeu
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawBall();
  drawPaddle();

  /* Animations de la balle */
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x - ball.radius + ball.dx < 0 || ball.x + ball.radius + ball.dx > canvas.width) { // Collision horizontale
    ball.dx = -ball.dx; // Changement de direction horizontale
  }
  if (ball.y - ball.radius + ball.dy < 0) { // Collision avec le mur du haut
    ball.dy = -ball.dy; // Changement de direction verticale
  }
  else if (ball.y + ball.radius + ball.dy > canvas.height/* - paddle.height*/) {
    if (ball.x/* + ball.dx */> paddle.x &&
        ball.x/* + ball.dx */< paddle.x + paddle.width) {
      ball.dy = -ball.dy; // Changement de direction verticale
    }
    else { // Fin du jeu
      alert("GAME OVER");
      document.location.reload();
    }
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
