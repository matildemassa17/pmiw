class Cucaracha {
  constructor(x, y, imgCucaracha) {
    this.imagen=imgCucaracha;
    this.x=x;
    this.y=y;
    this.tam= random(45, 60);
    this.vel=3;
  }

  dibujaCucaracha() {
    image(this.imagen, this.x, this.y, this.tam, this.tam);
  }
  caenCucarachas() {
    if (this.y>height+this.tam) {
      this.y -= 1500;
      this.x=random(0, width - this.tam);
    }
    this.y+=this.vel;
  }
}
