
boidNumber = 100;
flock = [];
function setup(){

    createCanvas(windowWidth,windowHeight);
    for(let i = 0; i< boidNumber ; i++){
        flock.push(new Boid());
    }
}

function draw(){
    background(51);

    for(let boid of flock){
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }

}