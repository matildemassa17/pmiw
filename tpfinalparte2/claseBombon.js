class Bombon {
  constructor(x, y, imgBombon) {
    this.imagen=imgBombon;
    this.x=x;
    this.y=y;
    this.tam= random(45, 60);
    this.vel=3;
  }

  dibujaBombon() {
    image(this.imagen, this.x, this.y, this.tam, this.tam);
  }
  caenBombones() {
    if (this.y>height+this.tam) {
      this.y -= 1500;
      this.x=random(0, width - this.tam);
    }
    this.y+=this.vel;
  }
}
