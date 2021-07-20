let img;
let cnv;
let pixels = [];
let colNum = 0 ;
let rowNum = 0 ;
let valx=0;
let valy=0;
let osilate = 1 ;
let angle = 0;
function preload() {
    img = loadImage('assets/다운로드 (36).jpg')
}

function setup() {
    cnv = createCanvas(img.width, img.height);
    console.log(img.width,img.height)
    let newCanvasX = (windowWidth - img.width) / 2;
    let newCanvasY = (windowHeight - img.height) / 2;
    cnv.position(newCanvasX, newCanvasY)

}

function draw() {
    for (let col = 0 ; col < img.width; col+=20){
        colNum++;
        for(let row = 0; row < img.height; row+=20){
            // let xPos = col;
            // let yPos = row;
            // let c = img.get(xPos,yPos)
            rowNum++;
            // translate(xPos,yPos);
            let c = img.get(col,row);
            pixels.push(c);


            valx += 0.001;
            valy += 0.012;
            // noFill();
            fill(color(c))
            // stroke(color(c));
            // strokeWeight(random(5));
            // point(col, row);

            angle += 0.02;

            console.log(osilate)
            osilate *= sin(angle);
            // console.log(angle)
            rect(col*osilate,row*osilate,20,20)
        }

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}

