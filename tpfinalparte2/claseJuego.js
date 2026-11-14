class Juego {

  constructor(fondo, cantBombones, imgBombon, imgCuca, imagenesMario,
    imgVidas, imgInicio, imgTutorial, musicaST) {

    // estado inicial y fondos de las pantallas
    this.estado = "inicio";
    this.fondo = fondo;
    this.inicio = imgInicio;
    this.tutorial = imgTutorial;
    this.ganaste = imgGanaste;
    this.perdiste = imgPerdiste;

    // personaje e interfaz
    this.mario = new Mario(200, 200, imagenesMario);
    this.interfaz = new Interfaz(imgVidas, musicaST);

    // cantidad y arreglos de objetos que caen
    this.cant = cantBombones;
    this.bombones = [];
    this.cucarachas = [];

    // crear cada bombon y cada cucaracha
    for (let i = 0; i < this.cant; i++) {
      this.bombones[i] = new Bombon(
        random(50, 700), -60 - i * 300, imgBombon
        );
      this.cucarachas[i] = new Cucaracha(
        random(50, 700), -210 - i * 300, imgCuca
        );
    }

    //botones
    this.botonJugar = new Boton (260, 400, 335, 380, "juego");
    this.botonTutorial = new Boton (405, 538, 339, 376, "tutorial");
    this.botonVolverTutorial = new Boton (630, 760, 310, 370, "inicio");
    this.botonPerdisteReiniciar = new Boton (220, 395, 338, 378, "juego");
    this.botonPerdisteInicio = new Boton (410, 615, 338, 378, "inicio");
    this.botonGanaste = new Boton (292, 508, 343, 379, "inicio");
  }

  //mostrar la pantalla que corresponde
  dibujar() {
    if (this.estado === "inicio") {
      image(this.inicio, 0, 0, width, height)
    }

    if (this.estado === "tutorial") {
      image(this.tutorial, 0, 0, width, height);
    }

    if (this.estado === "juego") {
      image(this.fondo, 0, 0, width, height);
      this.dibujaBombones();
      this.marioJuega();
      this.interfazMM();

      if (this.interfaz.puntos >= 10) {
        this.estado = "animacionGanar";
      }

      if (this.interfaz.cantVidas <= 0) {
        this.estado = "animacionPerder";
      }
    }

    if (this.estado === "animacionGanar") {
      image(this.fondo, 0, 0, width, height);

      if (this.mario.poseGanar < 4) {
        this.mario.animarGanar();
      } else {
        this.estado = "ganaste";
      }
    }

    if (this.estado === "animacionPerder") {
      image(this.fondo, 0, 0, width, height);

      if (this.mario.posePerder < 4) {
        this.mario.animarPerder();
      } else {
        this.estado = "perdiste";
      }
    }


    if (this.estado === "ganaste") {
      image(this.ganaste, 0, 0, width, height)
    }

    if (this.estado === "perdiste") {
      image(this.perdiste, 0, 0, width, height)
    }
  }

  dibujaBombones() {

    for (let i=0; i<this.cant; i++) {
      this.bombones[i].dibujaBombon();
      this.bombones[i].caenBombones();
      this.cucarachas[i].dibujaCucaracha();
      this.cucarachas[i].caenCucarachas();

      //cada vez que una cucaracha hace contacto con mario, pierde una vida
      if ( this.cucarachas[i].y + this.cucarachas[i].tam > this.mario.y &&
        this.cucarachas[i].y < this.mario.y + 20 &&
        this.cucarachas[i].x + this.cucarachas[i].tam >= this.mario.x &&
        this.cucarachas[i].x < this.mario.x + 72
        ) {
        this.interfaz.perderVida();
        this.cucarachas[i].y -= 1500;
      }

      //cada vez que un bombon hace contacto con mario, suma un punto
      if ( this.bombones[i].y + this.bombones[i].tam > this.mario.y &&
        this.bombones[i].y < this.mario.y + 20 &&
        this.bombones[i].x + this.bombones[i].tam >= this.mario.x &&
        this.bombones[i].x < this.mario.x + 72
        ) {
        this.interfaz.sumarPunto();
        this.bombones[i].y -= 1500;
      }
    }
  }
  marioJuega() {
    this.mario.dibujarMario();
    this.mario.moverMario();
  }
  interfazMM() {
    this.interfaz.dibujaCorazon();
    this.interfaz.dibujarPuntos();
  }

  //botones
  presionarBotones() {
    if (this.estado === "inicio") {
      this.botonJugar.presionar();
      this.botonTutorial.presionar();
    } else if (this.estado === "tutorial") {
      this.botonVolverTutorial.presionar();
    } else if (this.estado === "perdiste") {
      this.botonPerdisteReiniciar.presionar();
      this.botonPerdisteInicio.presionar();

      // si un boton nos saco de "perdiste", reiniciamos los valores
      if (this.estado !== "perdiste") {
        this.reiniciar();
      }
    } else if (this.estado === "ganaste") {
      this.botonGanaste.presionar();

      if (this.estado === "inicio") {
        this.reiniciar();
      }
    }
  }

  //preparar una partida nueva
  reiniciar () {

    this.interfaz.cantVidas = 3;
    this.interfaz.puntos = 0;
    this.mario.posePerder = 0;
    this.mario.poseGanar = 0;
    this.mario.contadorPerder = 0;
    this.mario.contadorGanar = 0;
    this.mario.x = 200;
    this.mario.y = 200;
    for (let i = 0; i < this.cant; i++) {
      this.bombones[i].y = -60 -i * 300;
      this.cucarachas[i].y = -210 - i * 300;
    }
  }

  //activar musica
  musicaliza() {
    if (this.estado==="inicio") {
      this.interfaz.reproducirMusica();
    }
  }
}
