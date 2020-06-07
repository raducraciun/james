var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Contexte 2D

var nbC = canvas.width/16, // 40 colonnes
    nbL = canvas.height/16; // 30 lignes

var grille = []; // Tableau 1D pour des calculs plus rapides

function initGrille() {
  for (var i = 0; i < nbC * nbL; i++) {
    grille[i] = 0; // Case vide par défaut
  }
}

initGrille();

function afficheGrille() { // Grille rectangulaire de cellules carrées
  for (var i = 0; i < nbL; i++) {
    for (var j = 0; j < nbC; j++) {
      var cell = grille[i* nbC + j]; // Equivalent à tab[i][j] si tab est 2D
      var cellPad = 2; // Marge extérieure
      var cellL = canvas.width/nbC - cellPad, // Hauteur
          cellH = canvas.width/nbC - cellPad; // Largeur
      var x = j*(cellL + cellPad) + 1; // Abscisse du coin haut gauche
      var y = i*(cellH + cellPad) + 1; // Ordonnée du coin haut gauche

      ctx.beginPath();
      ctx.rect(x, y, cellL, cellH);
      if (cell != 0) {
        ctx.fillStyle = "#007f00"
      }
      else {
        ctx.fillStyle = "#909090";
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

afficheGrille();
