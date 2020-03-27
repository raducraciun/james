var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var ball = {
  radius: 10,
  x: canvas.width/2,
  y: canvas.height - 30
};

var vel = {
  x: 2,
  y: -2
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

  ball.x += vel.x; // Anime la balle
  ball.y += vel.y;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
