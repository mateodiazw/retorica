class Circle {
    constructor(posX, posY, tam) {
        this.posX = posX;
        this.posY = posY;
        this.tam = tam;
        this.opacidad = 0;
        this.sePinto = false;
        this.contador = 0;
        this.pintando = false;
        this.aumento = 2;
        this.x = [];
        this.y = [];
        this.t = [];
        this.color = 0;
    }


    dibujar() {
        stroke(50);
        fill(this.color, this.opacidad);
        ellipse(this.posX, this.posY, this.tam);
    }

    estresar() {
        if (this.sePinto) {
            this.contador++;
            if (this.contador <= 300) {
                this.opacidad = 255;
            } else {
                this.opacidad = 0;
                this.sePinto = false;
                this.contador = 0;
                this.pintando = false;
            }
        }
    }

    dentro(x, y) {
        let d = dist(x, y, this.posX, this.posY);
        return d < this.tam / 2;
    }

    // AQUI //

    aqui() {
        if (this.tam >= 110) {
            this.aumento = -1;
        } else if (this.tam < 80) {
            this.aumento = 1;
        }
        this.tam += this.aumento;
    }

    // EXAMINAR // 
    muchosCirculos() {
        if (!this.sePinto) {
            for( let i = 0; i < 17; i++) {
                this.x.push(random(this.posX - this.tam/4, this.posX + this.tam/4));
                this.y.push(random(this.posY - this.tam/4, this.posY + this.tam/4));
                this.t.push(random(50,100));
            }
            this.sePinto = true;
        }

        for( let i = 0; i < 7; i++) {
            push();
            fill(0,0,0,255);
            ellipse(this.x[i],this.y[i],this.t[i])
            pop();
        }
    }
}