var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var cells = [], cellsBuff = []; // Tableaux de cellules primaire et secondaire
var nbCols = canvas.width/16, // 40
nbRows = canvas.height/16; // 30

for (var i = 0; i < nbRows; i++) {
  cells[i] = [];
  cellsBuff[i] = [];
  for (var j = 0; j < nbCols; j++) {
    cells[i][j] = {isAlive: false};
    // cellsBuff[i][j] = {isAlive: false};
  }
}

function drawCells() {
  for (var i = 0; i < nbRows; i++) {
    for (var j = 0; j < nbCols; j++) {
      var cell = cells[i][j];
      var cellPad = 2;
      var cellW = canvas.width/nbCols - cellPad,
          cellH = canvas.width/nbCols - cellPad;
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

var mouseClickedButton = {
  main: false
};

var mouseRelativePosition = { // Position relative à l'élément cliqué
  x: 0,
  y: 0
};

function mouseClickHandler(event) {
  if (event.button == 0) { // Clic principal (souvent gauche)
    mouseClickedButton.main = true;
    mouseRelativePosition.x = event.offsetX;
    mouseRelativePosition.y = event.offsetY;
  }
}

canvas.addEventListener("click", mouseClickHandler);

function countAliveNeighbours(row, col) {
  var count = 0;

  if (row - 1 >= 0) {
    if (col - 1 >= 0) {
      if (cells[row - 1][col - 1].isAlive) {
        count++;
      }
    }
    if (cells[row - 1][col].isAlive) {
      count++;
    }
    if (col + 1 < nbCols) {
      if (cells[row - 1][col + 1].isAlive) {
        count++;
      }
    }
  }
  if (col - 1 >= 0) {
    if (cells[row][col - 1].isAlive) {
      count++;
    }
  }
  if (col + 1 < nbCols) {
    if (cells[row][col + 1].isAlive) {
      count++;
    }
  }
  if (row + 1 < nbRows) {
    if (col - 1 >= 0) {
      if (cells[row + 1][col - 1].isAlive) {
        count++;
      }
    }
    if (cells[row + 1][col].isAlive) {
      count++;
    }
    if (col + 1 < nbCols) {
      if (cells[row + 1][col + 1].isAlive) {
        count++;
      }
    }
  }

  return count;
}

function nextLifecylce() {
  for (var i = 0; i < nbRows; i++) {
    cellsBuff[i] = [...cells[i]];
  }

  for (var i = 0; i < nbRows; i++) {
    for (var j = 0; j < nbCols; j++) {
      console.log(countAliveNeighbours(i, j));
    }
  }
}

document.getElementById("btnNextLifecycle").addEventListener("click", nextLifecylce)

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawCells();

  if (mouseClickedButton.main) {
    mouseClickedButton.main = false;
    var r = Math.floor(mouseRelativePosition.y*nbRows/canvas.height),
        c = Math.floor(mouseRelativePosition.x*nbCols/canvas.width);

    cells[r][c].isAlive = !cells[r][c].isAlive;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
