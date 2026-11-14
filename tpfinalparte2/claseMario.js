class Mario {

  constructor (x, y, imagen) {
    //posicion e imagenes
    this.x = x;
    this.y = y;
    this.imagen = imagen;

    //animacion de caminar y orientacion
    this.pose = 0;
    this.contador = 0;
    this.miraDerecha=true

      //animacion ganar
      this.poseGanar=0;
    this.contadorGanar=0;

    //animacion perder
    this.posePerder=0;
    this.contadorPerder=0;
  }

  dibujarMario () {
    if (!this.miraDerecha) {
      push();
      translate(this.x +72, this.y);
      scale(-1, 1);
      image (this.imagen[this.pose], 0, 0, 72, 130);
      pop();
    } else {
      image (this.imagen[this.pose], this.x, this.y, 72, 130);
    }
  }

  moverMario() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
      this.miraDerecha=false;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
      this.miraDerecha=true;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x > width - 72) {
      this.x = width - 72;
    }

    if (keyIsDown (LEFT_ARROW) || keyIsDown (RIGHT_ARROW) ) {

      if (this.pose === 0) {
        this.pose = 1;
      }

      this.contador++;

      if (this.contador >= 8) {
        this.pose++


          if (this.pose>3) {
          this.pose = 1;
        }

        this.contador = 0;
      }
    } else {
      this.pose = 0;
      this.contador = 0;
    }
  }

  animarGanar() {
    image(marioGana[this.poseGanar], this.x, this.y, 72, 130);
    this.contadorGanar++;

    if (this.contadorGanar>=30) {
      this.poseGanar++;
      this.contadorGanar=0;
    }
  }

  animarPerder() {
    image(marioPierde[this.posePerder], this.x, this.y, 72, 130);
    this.contadorPerder++;

    if (this.contadorPerder>=30) {
      this.posePerder++;
      this.contadorPerder=0;
    }
  }
}
