this.sticky = false;


class Rain{


    constructor(){
        this.x = random(width);
        this.y = random(-500,-50);
        this.z = random(0,20);
        this.len = map(this.z,0,20,10,20);
        this.yspeed = map(this.z,0,20,1,3);
        this.prevXpos;
    }

    fall(){
        this.y = this.y + this.yspeed;
        let grav = map(this.z,0,20,0,0.2);
        this.yspeed = this.yspeed + grav;
        // console.log(this.x,this.y,sticky)

        if(this.y > height*0.9){
            this.prevXpos = this.x;
            this.x = random(width);
            sticky = true
            this.y = random(-200,-100);
            this.yspeed = map(this.z,0,20,1,10);


        }
    }

    show(){
        push();
        strokeWeight(map(this.z,0,20,1,4));
        stroke(138,43,226);
        line(this.x,this.y,this.x,this.y+10);

        if(sticky){
            ellipse(this.prevXpos,height*0.9,this.len,this.len*0.5);
        }
        pop();
    }
}