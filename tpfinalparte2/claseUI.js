class Interfaz {
  constructor(corazon, fondoMusica) {
    this.vida=corazon;
    this.cantVidas=3;
    this.puntos=0;
    this.musicaFondo = fondoMusica;
  }


  //dibujar vidas y puntos
  dibujaCorazon() {
    for (let i=0; i<this.cantVidas; i++) {
      image(this.vida, 20+(i*40), 20, 30, 30);
    }
  }

  dibujarPuntos() {
    fill(255);
    textSize(20);
    text("Puntos: "+ this.puntos, 700, 35);
  }

  //actualizar valores de partida
  perderVida() {
    this.cantVidas-= 1
  }

  sumarPunto() {
    this.puntos+=1
  }


  //reptoducir musica si no esta sonando
  reproducirMusica() {
    if (this.musicaFondo && !this.musicaFondo.isPlaying()) {
      this.musicaFondo.loop();
      this.musicaFondo.setVolume(0.4);
    }
  }
}

class Boton {
  constructor (posXinicio, posXfinal, posYinicio, posYfinal, estadodeseado) {
    this.posXinicio=posXinicio;
    this.posXfinal=posXfinal;
    this.posYinicio=posYinicio;
    this.posYfinal=posYfinal;
    this.estadodeseado=estadodeseado;
  }

  presionar() {
    if (mouseX >= this.posXinicio && mouseX <= this.posXfinal &&
      mouseY >= this.posYinicio && mouseY <= this.posYfinal) {
      juego.estado = this.estadodeseado;
    }
  }
}
