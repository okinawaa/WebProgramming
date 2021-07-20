class Boid{

    constructor() {

        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.acceleration = createVector();
        this.maxForce = 0.4;
        this.maxSpeed =5;

    }

    edges(){
        if(this.position.x > width){
            this.position.x = 0;
        }else if (this.position.x < 0){
            this.position.x = width;
        }else if (this.position.y > height){
            this.position.y = 0 ;
        }else if (this.position.y < 0){
            this.position.y = height;
        }
    }

    align(boids){
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids){
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if(other != this && d < perceptionRadius){
                steering.add(other.velocity);
                total++;
            }
        }

        if(total>0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);

            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids){
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids){
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if(other != this && d < perceptionRadius){
                steering.add(other.position);
                total++;
            }
        }

        if(total>0){
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }


    flock(boids){
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }


    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);

    }


    show(){
        strokeWeight(16);
        stroke(255);
        point(this.position.x,this.position.y);
    }
}