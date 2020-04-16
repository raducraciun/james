var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var iteration = 0;
var nbCols = canvas.width/16, // L_canvas (px) / L_cellule (px)
nbRows = canvas.height/16;
var cells = [
  {r: 0, c: 0},
  {r: 2, c: 3},
  {r: 3, c: 1},
  {r: 3, c: 2},
  {r: 3, c: 3},
  {r: 4, c: 3},
  {r: 5, c: 2},
],
    cellsBuff = []; // Tableaux de cellules vivantes principal et temporaire

// TODO: inclure une réinitialisation des autres paramètres et renommer la fonction
function reset() { // Réinitialise certaines variables
  cells = [];
  cellsBuff = [];
}

function indexOfCell(row, col) { // Indice de l'objet dans le tableau des cellules
  var i = 0;
  var idx = -1;
  var found = false;

  while (found == false && i < cells.length) {
    if (cells[i].r == row && cells[i].c == col) {
      found = true
      idx = i;
    }
    else {
      i++;
    }
  }

  return idx;
}

// IDEA: UTILISER UN OBJET POUR SURVEILLER L'ETAT DES BOUTONS => IMPLANTER L'EXCLUSION MUTUELLE DE CERTAINS BOUTONS

document.getElementById("btnReset").addEventListener("click", function () {
  reset();
  autoPlay.isOn = false; // Valide car autoPlay est déclaré avec "var"
});

function drawCells() {
  for (var i = 0; i < nbRows; i++) {
    for (var j = 0; j < nbCols; j++) {
      var cellPad = 2;
      var cellW = canvas.width/nbCols - cellPad,
          cellH = canvas.width/nbCols - cellPad;
      var x = j*(cellW + cellPad) + 1;
      var y = i*(cellH + cellPad) + 1;
      ctx.beginPath();
      ctx.rect(x, y, cellW, cellH);

      if (indexOfCell(i, j) >= 0) { // Si la cellule est vivante
        ctx.fillStyle = "#007f00"
      }
      else {
        ctx.fillStyle = "#909090";
      }
      ctx.fill();
      ctx.closePath();
    }
  }

  document.getElementById("iteration").innerHTML = "Itération" + " " + iteration;
}

var clickOnCanvasEvent = {
  mainButton: false,
  x: 0,
  y: 0
};

canvas.addEventListener("click", function (event) {
  if (event.button == 0) { // Clic principal (souvent gauche)
    clickOnCanvasEvent.mainButton = true;
    clickOnCanvasEvent.x = event.offsetX;
    clickOnCanvasEvent.y = event.offsetY;
  }
});

function countAliveNeighbours(row, col) {
  var ul = 0, u = 0, ur = 0, l = 0, r = 0, dl = 0, d = 0, dr = 0; // Une variable par voisine

  for (var i = 0; i < cells.length; i++) {
    var r = cells[i].r,
        c = cells[i].c;

    if (r == row - 1 && c == col - 1) {
      ul = 1;
    }
    if (r == row - 1 && c == col) {
      u = 1;
    }
    if (r == row - 1 && c == col + 1) {
      ur = 1;
    }
    if (r == row && c == col - 1) {
      l = 1;
    }
    if (r == row && c == col + 1) {
      r = 1;
    }
    if (r == row + 1 && c == col - 1) {
      dl = 1;
    }
    if (r == row + 1 && c == col) {
      d = 1;
    }
    if (r == row + 1 && c == col + 1) {
      dr = 1;
    }
  }

  return ul + u + ur + l + r + dl + d + dr;
}

function nextLifecycle() {
  cellsBuff = [];

  for (var i = 0; i < nbRows; i++) {
    for (var j = 0; j < nbCols; j++) {
      var state = (indexOfCell(i, j) >= 0); // Etat de la celleule courante
      var n = countAliveNeighbours(i, j);

      console.log(i, j, n);
      if (n == 3 || (state == true && n == 2)) {
        cellsBuff.push({r: i, c: j});
      }
    }
  }

  cells = [];
  for (var i = 0; i < cellsBuff.length; i++) {
    cells.push(cellsBuff[i]);
  }

  iteration++;
}

document.getElementById("btnNextLifecycle").addEventListener("click", function () {
    if (!autoPlay.isOn) {
      nextLifecycle();
    }
})

var autoPlay = {
  isOn: false,
  maxInterval: 250, // Constant
  interval: 250, // Variable
  returnVar: undefined // Utile pour les fonctions setInterval et clearInterval
};

document.getElementById("btnAutoPlay").addEventListener("click", function () {
  if (!autoPlay.isOn) {
    autoPlay.isOn = true;
    autoPlay.returnVar = setInterval(nextLifecycle, autoPlay.interval);
  }
})

document.getElementById("sldrValue").innerHTML = document.getElementById("sldrInput").value; // Affiche la valeur dès le chargement de la page

document.getElementById("sldrInput").oninput = function () {
  document.getElementById("sldrValue").innerHTML = this.value; // Met à jour la valeur affichée
  autoPlay.interval = autoPlay.maxInterval/this.value;
  if (autoPlay.isOn) {
    clearInterval(autoPlay.returnVar);
    autoPlay.returnVar = setInterval(nextLifecycle, autoPlay.interval);
  }
}

document.getElementById("btnStop").addEventListener("click", function () {
  autoPlay.isOn = false;
  clearInterval(autoPlay.returnVar);
  autoPlay.returnVar = undefined;
})


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawCells();

  if (clickOnCanvasEvent.mainButton) {
    clickOnCanvasEvent.mainButton = false;
    var r = Math.floor(clickOnCanvasEvent.y*nbRows/canvas.height),
        c = Math.floor(clickOnCanvasEvent.x*nbCols/canvas.width);

    cells[r][c].isAlive = !cells[r][c].isAlive;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
