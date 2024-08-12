let estado = 0;
let circ;
let sombra;
let circulo;
let circulos = [];

function preload() {
  circ = loadImage("data/circ.png");
  sombra = loadImage("data/sombra.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  circulo = new Circulo(circ, sombra, width / 2, height / 2, 200);
  circulos[0] = new Circulo(circ, sombra, width / 2, height / 2, 200);
}

function draw() {
  background(255);
  switch (estado) {
    case 0:
      push();
      background(0);
      textSize(30);
      fill(255);
      text("ESTOY AQUÍ", width / 2, 100);
      textSize(23);
      text(
        "Clickeá el número de la pantalla a la que queres dirigirte",
        width / 2,
        200
      );
      textAlign(LEFT);
      text(
        "1 = REPETICIÓN \n 2 = ACUMULACIÓN \n 3 = ELIPSIS \n 4 = HIPÉRBOLE \n 5 = METÁFORA \n 6 = METONIMIA",
        width / 2 - 100,
        400
      );
      pop();
      break;
    case 1: //repeticion
      circulo.dibujar();
      circulo.repeticion();
      break;
    case 2: //acumulacion
      for (let i = 0; i < circulos.length; i++) {
        circulos[i].dibujar();
      }
      circulos[circulos.length - 1].repeticion();
      text(circulos.length, 50, 50);
      break;
    case 3: //elipsis
      circulo.dibujarSombra();
      if (circulo.dentro(mouseX, mouseY)) {
        circulo.repeticion();
      }
      break;
    case 4: //hiperbole
    circulo.dibujar();
      //circulo.repeticion();
      circulo.agrandar();
      text(circulo.t, 50, 50);
      break;
    case 5: //metafora
      break;
    case 6: //metonimia
      break;
  }
}

function mousePressed() {
  switch (estado) {
    case 1: //repeticion
      if (circulo.dentro(mouseX, mouseY)) {
        circulo.x = random(80, width - 80);
      }
      break;
    case 2: //acumulacion
      if (circulos[circulos.length - 1].dentro(mouseX, mouseY)) {
        circulos.push(
          new Circulo(
            circ,
            sombra,
            random(width / 5, width - width / 5),
            random(height / 5, height / 2 + height / 8),
            random(100, 250)
          )
        );
      }

      break;
    case 3: //elipsis
      break;
    case 4: //hiperbole
      break;
    case 5: //metafora
      break;
    case 6: //metonimia
      break;
  }
}

function keyPressed() {
  if (key == 0) {
    estado = 0;
    reset ()
  } else if (key == 1) {
    estado = 1;
    reset ()
  } else if (key == 2) {
    estado = 2;
    reset ()
  } else if (key == 3) {
    estado = 3;
    reset ()
  } else if (key == 4) {
    estado = 4;
    reset ()
  } else if (key == 5) {
    estado = 5;
    reset ()
  } else if (key == 6) {
    estado = 6;
    reset ()
  }
}

function reset (){
  let circulos = [];

}
