var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var ball = {
  radius: 10,
  x: canvas.width/2,
  y: canvas.height - 30
};

var vel = {
  dx: 2,
  dy: -2
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function draw() { // Boucle de jeu
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawBall(); // Dessine la balle

  if (ball.x - ball.radius + vel.dx < 0 || ball.x + ball.radius + vel.dx > canvas.width) { // Collision à gauche ou à droite
    vel.dx = -vel.dx; // Changement de direction horizontale
  }

  if (ball.y - ball.radius + vel.dy < 0) { // Collision en haut
    vel.dy = -vel.dy; // Changement de direction verticale
  }

  ball.x += vel.dx; // Anime la balle
  ball.y += vel.dy;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
