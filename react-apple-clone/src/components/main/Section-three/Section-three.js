import React from 'react';

function SectionThree(props) {
    return (
        <section className="scroll-section" id="scroll-section-2">
            <div className="sticky-elem sticky-elem-canvas">
                <canvas id="video-canvas-1" width="1920" height="1080"></canvas>
            </div>
            <div className="sticky-elem main-message a">
                <p>
                    <small>편안한 촉감</small>
                    입과 하나 되다
                </p>
            </div>
            <div className="sticky-elem desc-message b">
                <p>
                    편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가
                    댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.
                </p>
                <div className="pin"></div>
            </div>
            <div className="sticky-elem desc-message c">
                <p>
                    디자인 앤 퀄리티 오브 스웨덴,<br/>메이드 인 차이나
                </p>
                <div className="pin"></div>
            </div>
        </section>
    );
}

export default SectionThree;