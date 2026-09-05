//arreglos
let correr = [];
let parado = [];
let entrar = [];
//backgrounds
let inicio, fondo, moe, fin;

let estado; // 1=intro, 2=parado, 3=correr, 4=calle de moe, 5=entrar, 6=fin
let animarparado, animarcorrer, animarentrar;
let posX,posY,vel;

//boton inicio
let posXbotonInicio, posYbotonInicio, radiobotonInicio;
//
let posXbotonFinal, posYbotonFinal, radiobotonFinal


function preload () {
  
  inicio= loadImage ("data/inicio.png");
  fondo= loadImage ("data/fondo.png");
  moe = loadImage ("data/moe.png");
  fin = loadImage ("data/fin.jpeg");
  
  for (let i=0; i<16; i++) {
    parado[i] = loadImage ("data/parado("+i+").png");
  }
  
  for (let i=0; i<16; i++) {
    correr[i] = loadImage ("data/correr("+i+").png");
  }
  
  for(let i=0; i<16; i++) {
    entrar[i] = loadImage ("data/entrar("+i+").png");
  }
}
function setup() {

  createCanvas (800,600);
 
  estado=1;
  posX=width/12;
  posY=400;
  vel = 4;
  animarparado=0;
  animarcorrer=0;
  animarentrar=0;
 
 //boton Inicio
  posXbotonInicio=400;
  posYbotonInicio=438;
  radiobotonInicio=60;
  
 //boton Final
  posXbotonFinal = 720; 
  posYbotonFinal = 540; 
  radiobotonFinal = 32;
  
  
}


function draw() {

  background(0);
  
  if (estado==1){
  image(inicio,0,0,width,height);
  generarboton (posXbotonInicio,posYbotonInicio,radiobotonInicio);
}
  
  if (estado==2) {
  image (fondo,0,0,width,height);
  
  
  animarparado =  animar(parado,animarparado,15,8,posX,posY);
 
  if (animarparado>14){
  estado=3;
}
 
  
  }
  
  if (estado==3) {
 image(fondo,0,0,width,height);
  posX+=vel;
  animarcorrer = animar (correr,animarcorrer,15,3,posX,posY);
  if (limiteAlcanzado(posX,width)) {
    estado=4
    posX = -100;
}
}
  
  
  if (estado==4) {
    image(moe,0,0,width,height);
     posX += vel;
     animarcorrer = animar (correr,animarcorrer,15,3,posX,posY,102,148);
 if (limiteAlcanzado(posX,360)) {
  estado=5
 }
  }
  if (estado==5){
   image(moe,0,0,width,height);
    posY -= vel;
    posX = 360
   animarentrar = animar (entrar,animarentrar,15,4,posX,posY,102,148);
   
   if (posY<320){
   estado=6
   }
  }

  if (estado==6) {
  
  image(fin,0,0,width,height);
  fill(255, 190, 40); 
  stroke(40,20,60);
  strokeWeight(1.5);
  circle(posXbotonFinal, posYbotonFinal, radiobotonFinal*2); // radio *2 porq circle usa diametro

  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  fill(0);
  text("RESET", posXbotonFinal, posYbotonFinal);
  generarboton (posXbotonFinal,posYbotonFinal,radiobotonFinal);
  }
  

}

function mousePressed() {
  if (generarboton (posXbotonInicio,posYbotonInicio,radiobotonInicio)) {
    estado = 2;
  }
  
  if (generarboton (posXbotonFinal,posYbotonFinal,radiobotonFinal)) {
    estado = 1; 
    posX=width/12;
    posY=400;
    vel = 4;
    animarparado = 0;
    animarcorrer = 0;
    animarentrar = 0;
    
}
}

//funcion propia para generar botones

function generarboton (xBoton, yBoton, radio) {
  if(dist(mouseX,mouseY,xBoton, yBoton) < radio) {
  return true;
  }
  else {
  return false;
  }
} 

//funcion propia para animar 

function animar (arreglo, contador, limite, velocidad,x,y,tamX,tamY) {
 image (arreglo[contador], x, y,tamX,tamY); 
 if (contador >= limite) {
   contador=0;
 }
 if (frameCount % velocidad === 0 ) {
   contador++;
 }
 
 return contador;
}

//funcion propia para evaluar limite

function limiteAlcanzado (posActual, limite) {
  if (posActual > limite)
  return true;
  else {
  return false;
}
}


 
  
