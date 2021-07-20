
let rains = []
let rainNum = 100 ;


function setup() {
    createCanvas(windowWidth, windowHeight);

    for(let i=0 ; i <rainNum;  i++){

        rains.push(new Rain());
    }


}

function draw() {
    clear();
    background(230,230,250)
    rains.forEach(rain=>{
        rain.fall();
        rain.show();
    })
    push();
    strokeWeight(5);

    line(0,windowHeight*0.9,windowWidth,windowHeight*0.9)
    pop();
    push();
    fill(230,230,250)
    rect(0,windowHeight*0.9,windowWidth,windowHeight)
    pop()
    ;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}