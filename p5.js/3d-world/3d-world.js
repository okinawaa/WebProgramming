
let boxSize = 300;
let ang1 = 0;
let balls = []
let ballNum = 20
function setup(){
    createCanvas(windowWidth,windowHeight,WEBGL);
    angleMode(DEGREES)
    for(let i = 0 ; i<ballNum;i++){
        balls.push(new movingBall());
    }
}


function draw(){
    background(0);
    noFill();
    stroke('blue');
    strokeWeight(3);
    ang1+=0.5;
    rotateY(ang1);
    box(boxSize);

    balls.forEach(ball=>{
        ball.move();
        ball.display();
    })

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}