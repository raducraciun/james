var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var cells = [];
var nbCols = canvas.width/16, // 40
nbRows = canvas.height/16; // 30

for (var i = 0; i < nbRows; i++) {
  cells[i] = [];
  for (var j = 0; j < nbCols; j++) {
    cells[i][j] = {isAlive: false};
  }
}

function drawCells() {
  for (var i = 0; i < nbRows; i++) {
    for (var j = 0; j < nbCols; j++) {
      var cell = cells[i][j];
      var cellPad = 2;
      var cellW = canvas.width/nbCols - cellPad, cellH = canvas.width/nbCols - cellPad;
      if (i == j) {
        cell.isAlive = true;
      }
      var x = j*(cellW + cellPad) + 1;
      var y = i*(cellH + cellPad) + 1;
      ctx.beginPath();
      ctx.rect(x, y, cellW, cellH);
      if (cell.isAlive == true) {
        ctx.fillStyle = "#009900"
      }
      else {
        ctx.fillStyle = "#aaa";
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

function gameLoop() {
  drawCells();

}

gameLoop();
