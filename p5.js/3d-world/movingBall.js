
let ang2 = 0;
class movingBall {

    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.zRange = height;
        this.z = random(this.zRange)
        this.valx = random(200);
        this.valy = random(100);
        this.valz = random(300);
        this.size = random(10, 30);
        this.c = color(random(255), random(255), random(255), 200);
    }

    move() {
        // noise is to return a number from 0 - 1
        this.valx += 0.001;
        this.valy += 0.012;
        this.valz += 0.001;
        this.x = noise(this.valx) * width;
        this.y = noise(this.valy) * height;
        this.z = noise(this.valz) * this.zRange;
    }

    display() {
        push()
        translate(this.x - width / 2, this.y - height / 2, this.z - this.zRange / 2)
        ang2 += 0.1;
        rotateY(ang2);
        fill(this.c);
        stroke('white');
        strokeWeight(.5);
        sphere(this.size);
        let box_x = this.size*2+20;
        let box_y = 5;
        let box_z = 10;
        let petal = 18;
        let angle = 360 / petal;

        for(let i=0; i < petal;i++ ){
            rotate(angle);
        box(box_x,box_y,box_z);
        }
        pop();

    }
}

