class Circulo {
  constructor(circ, sombra, x, y, t) {
    this.circ = circ;
    this.sombra = sombra;
    this.x = x;
    this.y = y;
    this.t = t;
    this.tS = t;
    this.aumentar = true;
    this.disminuir = false;
    this.tamInicial = this.t;
  }

  dibujar() {
    image(this.sombra, this.x, height / 2 + 200, this.tS, this.tS);
    image(this.circ, this.x, this.y, this.t, this.t);
  }

  dibujarSombra() {
    image(this.sombra, this.x, height / 2 + 200, this.tS, this.tS);
  }

  repeticion() {
    push();
    if (this.aumentar) {
      this.t += 1;
      this.tS += 1;
    }
    if (this.t >= this.tamInicial + 20) {
      this.aumentar = false;
      this.disminuir = true;
    }
    if (this.disminuir) {
      this.t -= 1;
      this.tS -= 1;
    }
    if (this.t <= this.tamInicial - 20) {
      this.disminuir = false;
      this.aumentar = true;
    }
    pop();
  }

  agrandar() {
    this.t++;
    if (this.t < 500){
        this.tS ++;
    }
    if (this.t > 500){
        this.y -=0.4;
    }
  }

  dentro(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.t / 2;
  }
}
