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

function draw() { // Boucle de jeu
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawPaddle();
  drawBall(); // Dessine la balle

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
