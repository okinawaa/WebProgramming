let squares = [];


let util = {
    getColorElem() {
        let elem = Math.round(Math.random() * 255).toString(16);
        elem = elem.length === 1 ? 'f' + elem : elem;
        return parseInt(elem, 16);
    },
    getRandomColor() {
        return [this.getColorElem(), this.getColorElem(), this.getColorElem()]
    }
}


let song, analyzer;
let r, g, b

function preload() {
    song = loadSound('assets/twenty.mp3');
    vid = createVideo(['assets/twentyVid.mp4']);

}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(3.0);
    song.loop();
    // 새로운 진폭 분석기 생성
    analyzer = new p5.Amplitude();
    // 볼륨 분석기에 입력값 패치하기
    analyzer.setInput(song);
    filter = new p5.LowPass();
    song.connect(filter);
    fft = new p5.FFT();


    vid.elt.muted = false;
    vid.loop();
    vid.hide();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight,WEBGL);
}



let radius = 1 ;
function draw() {
    // 평균 진폭값(RMS) 받아오기
    let rms = analyzer.getLevel();
    let color = map(rms, 0, 1, 50, 255);
    background('#391C08');

    // 볼륨과 비례한 크기의 타원 그리기
    // ellipse(width / 2, height / 2, 10 + rms * 1000, 10 + rms * 1000);
    push();

    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(vid);
    box(rms*100+300,rms*100+300,rms*100+300)
    pop();
    // mouseX를 FFT 스펙트럼 가청 범위(10Hz-22050Hz)에 해당하는 밴드패스 주파수에 맵핑하기
    filterFreq = map(mouseX, 0, width, 10, 22050);

    // mouseY를 울림/폭에 맵핑하기
    filterRes = map(mouseY, 0, height, 15, 5);

    // 필터 매개 변수들 설정
    push()
    let spectrum = fft.analyze();
    translate (-windowWidth*0.26,0);
    fill('chocolate');
    noStroke();
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h);
    }
    pop();


}



