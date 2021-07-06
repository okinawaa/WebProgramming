function Character(info) {
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>';

    document.querySelector('.stage').appendChild(this.mainElem);

    this.mainElem.style.left = info.xPos + '%';
    // 스크롤 중인지 아닌지
    this.scrollState = false;
    // 바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    // 좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
    this.init();
}

Character.prototype = {
    constructor: Character,
    init: function () {
        const self = this;

        window.addEventListener('scroll', function () {
            clearTimeout(self.scrollState);

            if (!self.scrollState) {
                self.mainElem.classList.add('running');
            }

            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);

            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            if (self.lastScrollTop > pageYOffset) {
                // 이전 스크롤 위치가 크다면: 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');
            } else {
                // 현재 스크롤 위치가 크다면: 스크롤 내림
                self.mainElem.setAttribute('data-direction', 'forward');
            }

            self.lastScrollTop = pageYOffset;
        });

        window.addEventListener('keydown', function (e) {
            if (self.runningState) return;

            if (e.keyCode == 37) {
                // 왼쪽
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run(); // bind를 사용한 방법
                self.runningState = true;
            } else if (e.keyCode == 39) {
                // 오른쪽
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run(); // bind를 사용한 방법
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function (e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runningState = false;
        });
    },
    run: function (self) {
        if (self.direction == 'left') {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }

        if (self.xPos < 2) {
            self.xPos = 2;
        }

        if (self.xPos > 88) {
            self.xPos = 88;
        }

        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function () {
            self.run(self);
        });
    }
    // bind를 사용한 방법
    // run: function () {
    //     const self = this;
    //
    //     if (self.direction == 'left') {
    //         self.xPos -= self.speed;
    //     } else if (self.direction == 'right') {
    //         self.xPos += self.speed;
    //     }
    //
    //     if (self.xPos < 2) {
    //         self.xPos = 2;
    //     }
    //
    //     if (self.xPos > 88) {
    //         self.xPos = 88;
    //     }
    //
    //     self.mainElem.style.left = self.xPos + '%';
    //
    //     self.rafId = requestAnimationFrame(self.run.bind(self));
    // }
};
