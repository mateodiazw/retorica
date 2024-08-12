let circulos = [];
let estado = 0;
let posPreviaX = 0;
let posActualX = 0;
let posPreviaY = 0;
let posActualY = 0;
let circuloNegro;
let circuloBlanco;
let moverNegro = false;
let procesando = [];
let contador = 0;
let circuloTranquilo;
let VelTranq = 30;
let der = true;
let izq = false;
let circAnimado;
let arriba = false;
let abajo = false;
let velY = 20;
let circColapso;
let VelColapso = 5;
let aumento = false;
let grande = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  circulos.push(new Circle(width / 2, height / 2, 100));
  circuloNegro = new Circle(width / 8, (height / 3) * 2, 100);
  circuloBlanco = new Circle((width / 8) * 7, (height / 3) * 2, 100);
  for (let i = 0; i < 3; i++) {
    procesando[i] = new Circle(width / 2 - 70 + 70 * i, height / 4, 50);
    procesando[i].opacidad = 255;
  }
  circuloTranquilo = new Circle(width / 8, height / 2, 100);
  circAnimado = new Circle(width / 2, height * 0.8, 100);
  circColapso = new Circle(width / 2, height / 2, 100);

 grande [0] = new Circle(
    random(width / 8),
    random(height),
    random(300, 600)
  );
  grande [1] = new Circle(
    random(width / 3, width - width / 3),
    random(height / 4),
    random(200, 300)
  );
  grande [2] =  new Circle(
    random((width / 8) * 7, width),
    random(height),
    random(300, 600)
  );
}

function draw() {
  background(255);
  switch (estado) {
    case 1:
      push();
      for (let i = 0; i < circulos.length; i++) {
        if (circulos[i].dentro(mouseX, mouseY)) {
            // circulos[i].opacidad = 255;
          } 
          circulos[i].aqui();
        circulos[i].dibujar();
        circulos[i].estresar();
      }
      pop();
      break;
    case 2:
      push();
      circulos[0].dibujar();
      circulos[0].aqui();
      if (circulos[0].dentro(mouseX, mouseY)) {
        circulos[0].opacidad = 255;
      } else {
        circulos[0].opacidad = 0;
      }
      pop();
      break;
    case 3:
      push();
      
      for (let i = 0; i < 3; i++) {
        grande[i].muchosCirculos();
        grande[i].dibujar();
        grande[i].opacidad = 255;
        if (grande[i].dentro(circulos[0].posX, circulos[0].posY)) {
          grande[i].opacidad = 0;
        } else {
          grande[i].opacidad = 255;
        }
      }
      circulos[0].dibujar();
      circulos[0].opacidad = 255;
      circulos[0].color = 255;
      posActualX = lerp(posPreviaX, mouseX, 0.1);
      posActualY = lerp(posPreviaY, mouseY, 0.1);
      circulos[0].posX = posActualX;
      circulos[0].posY = posActualY;
      posPreviaX = posActualX;
      posPreviaY = posActualY;
      pop();
      break;
    case 4:
      circuloNegro.opacidad = 255;
      circuloNegro.dibujar();
      circuloBlanco.dibujar();
      if (circuloBlanco.dentro(mouseX, mouseY)) {
        circuloBlanco.opacidad = 255;
      } else {
        circuloBlanco.opacidad = 0;
      }
      if (circuloNegro.posX != circuloBlanco.posX) {
        circuloBlanco.aqui();
      }
      if (moverNegro) {
        if (contador > 60) {
          procesando[0].dibujar();
        }
        if (contador > 120) {
          procesando[1].dibujar();
        }
        if (contador > 180) {
          procesando[2].dibujar();
        }
        if (contador > 240) {
          contador = 0;
        }
        circuloNegro.posX += 2;
        contador += 2;
        if (circuloNegro.posX == circuloBlanco.posX) {
          circuloNegro.posX = circuloBlanco.posX;
          circuloBlanco.tam = circuloNegro.tam;
          moverNegro = false;
        }
      }
      break;
    case 5:
      circuloTranquilo.dibujar();
      circuloTranquilo.opacidad = 255;
      circuloBlanco.dibujar();
      circuloBlanco.posX = width / 2;
      circuloBlanco.posY = height - height / 4;
      circuloBlanco.aqui();
      if (circuloBlanco.dentro(mouseX, mouseY)) {
        circuloBlanco.opacidad = 255;
        if (mousePressed) {
          if (VelTranq > 3) {
            VelTranq -= 0.09;
          }
        }
      } else {
        circuloBlanco.opacidad = 0;
        if (VelTranq < 30) {
          VelTranq += 0.09;
        }
      }
      if (der) {
        circuloTranquilo.posX += VelTranq;
      }
      if (circuloTranquilo.posX > width - width / 8 - 100) {
        izq = true;
        der = false;
      }
      if (izq) {
        circuloTranquilo.posX -= VelTranq;
      }
      if (circuloTranquilo.posX < width / 8 + 100) {
        der = true;
        izq = false;
      }
      break;
    case 6:
      circAnimado.dibujar();
      circAnimado.aqui();
      if (circAnimado.dentro(mouseX, mouseY)) {
        circAnimado.opacidad = 255;
      } else {
        circAnimado.opacidad = 0;
      }

      if (arriba) {
        circAnimado.posY -= velY;
        velY -= 0.8;
      }
      if (circAnimado.posY <= height / 3) {
        arriba = false;
        abajo = true;
      }
      if (abajo) {
        circAnimado.posY += velY;
      }
      if (circAnimado.posY >= height * 0.8) {
        arriba = false;
        abajo = false;
        velY = 20;
      }
      break;
    case 7:
      circColapso.dibujar();
      circColapso.aqui();

      if (circColapso.dentro(mouseX, mouseY)) {
        circColapso.opacidad = 255;
      } else {
        circColapso.opacidad = 0;
      }

      if (der) {
        circColapso.posX += VelColapso;
      }
      if (circColapso.posX > width - circColapso.tam/2) {
        izq = true;
        der = false;
      }
      if (izq) {
        circColapso.posX -= VelColapso;
      }
      if (circColapso.posX < circColapso.tam/2) {
        der = true;
        izq = false;
      }



      if (abajo) {
        circColapso.posY += VelColapso;
      }
      if (circColapso.posY > height - circColapso.tam/2) {
        arriba = true;
        abajo = false;
      }
      if (arriba) {
        circColapso.posY -= VelColapso;
      }
      if (circColapso.posY < circColapso.tam/2) {
        abajo = true;
        arriba = false;
      }

if (aumento ){
    if (VelColapso<126){
    VelColapso += 0.6;
    }
    circColapso.opacidad = 255;

    

}
      break;
  }
}

function mousePressed() {
  switch (estado) {
    case 1:
      push();
      for (let i = 0; i < circulos.length; i++) {
        if (circulos[i].dentro(mouseX, mouseY)) {
          circulos[i].sePinto = true;
          circulos[i].pintando = true;
          let nuevo1 = new Circle(random(width), random(height), 100);
          let nuevo2 = new Circle(random(width), random(height), 100);
          circulos.push(nuevo1, nuevo2);
        }
      }
      pop();
      break;
    case 2:
      push();
      if (circulos[0].dentro(mouseX, mouseY)) {
        circulos[0].posX = random(
          circulos[0].tam / 2 + 10,
          width - circulos[0].tam / 2 - 10
        );
        circulos[0].posY = random(
          circulos[0].tam / 2 + 10,
          height - circulos[0].tam / 2 - 10
        );
      }
      pop();
      break;
    case 3:
      break;
    case 4:
      if (circuloBlanco.dentro(mouseX, mouseY)) {
        moverNegro = true;
      }
      break;
    case 6:
      if (circAnimado.dentro(mouseX, mouseY)) {
        arriba = true;
      }
      break;
      case 7:
        if (circColapso.dentro(mouseX, mouseY)) {
           aumento = true;
          }
          break;
  }
}

function keyPressed() {
  if (key == 0) {
    estado = 0;
  } else if (key == 1) {
    estado = 1;
  } else if (key == 2) {
    estado = 2;
  } else if (key == 3) {
    estado = 3;
  } else if (key == 4) {
    estado = 4;
  } else if (key == 5) {
    estado = 5;
  } else if (key == 6) {
    estado = 6;
  } else if (key == 7) {
    estado = 7;
    arriba = true;
  }
}
