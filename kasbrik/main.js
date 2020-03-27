var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var ball = {
  radius: 10,
  x: canvas.width/2,
  y: canvas.height - 30,
  dx: 2, // Vitesses en x et y
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
  dx: 7 // Vitesse en x
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
  drawBall(); // Dessine la balle
  drawPaddle();

  if (pressedKey.left) {
    paddle.x -= paddle.dx;
  }
  else if (pressedKey.right) {
    paddle.x += paddle.dx;
  }

  if (ball.x - ball.radius + ball.dx < 0 || ball.x + ball.radius + ball.dx > canvas.width) { // Collision à gauche ou à droite
    ball.dx = -ball.dx; // Changement de direction horizontale
  }

  if (ball.y - ball.radius + ball.dy < 0) { // Collision en haut
    ball.dy = -ball.dy; // Changement de direction verticale
  }

  ball.x += ball.dx; // Anime la balle
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
