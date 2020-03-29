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


function gameLoop() {

}

gameLoop();
