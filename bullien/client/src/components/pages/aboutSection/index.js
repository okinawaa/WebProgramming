import React from 'react';
import {
    AboutContainer,
    AboutContent, AboutParagraph, AboutTitle, MotionAboutParagraphContent, MotionImg,
} from "./AboutElement";
import {AnimatePresence} from "framer-motion";
import imgSrc from './images/KakaoTalk_20210823_185736510.png'

function AboutSection(props) {
    const transition = {duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96]}

    return (
        <AnimatePresence>
            <AboutContainer>
                <AboutContent>
                    <AboutTitle>
                        <MotionImg src={imgSrc}
                                   initial={{ y: (window.innerHeight / 2 - 200)}}
                                   animate={{
                                       y: 0,
                                       transition: {delay:0.5,...transition}
                                   }}/>
                    </AboutTitle>
                    <MotionAboutParagraphContent initial={{opacity: 0, y: 0, scale: 0}}
                                                 animate={{
                                                     opacity: 1,
                                                     y: 0,
                                                     scale: 1,
                                                     transition: {delay: 1.5, ...transition}
                                                 }}>
                        <AboutParagraph>Studio bullien<br/>Republic of Korea</AboutParagraph>
                        <AboutParagraph>
                            불리언은 평범한 아웃소싱을 하기보다는 <br/>
                            생각을 공유하며 같이 협업할 수 있는 <br/>
                            그런 파트너를 찾고 있습니다.
                        </AboutParagraph>
                        <AboutParagraph>은성밥차 옥탑방<br/>
                            521 West 21 Street<br/>
                            New York, NY 1011<br/>
                            USA<br/>
                            T +1 212 414 41 44<br/>
                            F +1 212 414 15 35<br/>
                            koreabullien@gmail.com<br/>
                            www.bullien.com
                        </AboutParagraph>
                    </MotionAboutParagraphContent>
                </AboutContent>
            </AboutContainer>
        </AnimatePresence>
    );
}

export default AboutSection;
