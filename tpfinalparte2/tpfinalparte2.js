//https://youtu.be/XgZTOYA7ovc?si=g15WWCRaujv23olq
// Matilde Massa y Morena Ramos
// Comision 1 
// Circe de Julio Cortazar

let juego;
let imageBombon, fondo, imgCucas, imgVida, imgInicio, imgGanaste, imgPerdiste, imgTutorial;
let imagenesMario = [];
let marioGana = [];
let marioPierde = [];
let soundtrack;


function preload() {
  soundtrack= loadSound("data/soundtrack.mp3");
  imageBombon= loadImage("data/bombon.png");
  fondo=loadImage("data/escenario.png");
  imgCucas=loadImage("data/cucaracha.png");
  imgVida = loadImage ("data/vida.png");
  for (let i=0; i<4; i++) {
    imagenesMario[i] = loadImage ("data/mario"+i+".png");
  }
  for (let i=0; i<4; i++) {
    marioGana[i] = loadImage ("data/marioGana"+i+".png");
  }

  for (let i=0; i<4; i++) {
    marioPierde[i] = loadImage ("data/marioPierde"+i+".png");
  }

  imgInicio = loadImage ("data/fondoinicio.jpeg");
  imgGanaste = loadImage ("data/ganaste.jpeg");
  imgPerdiste = loadImage ("data/perdiste.jpeg");
  imgTutorial = loadImage ("data/tutorial.png");
}
function setup() {
  createCanvas (800, 400);
  juego= new Juego(fondo, 5, imageBombon, imgCucas, imagenesMario, imgVida, imgInicio, imgTutorial, soundtrack);
}


function draw() {

  juego.dibujar();
}

function mousePressed() {

  juego.musicaliza();

  juego.presionarBotones();
}
