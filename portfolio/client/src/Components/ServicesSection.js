import React, {useEffect, useRef} from 'react';
import {InnerLayout} from "../styles/Layouts";
import styled from "styled-components";
import Title from "./Title";
import ServiceCard from "./ServiceCard";
import design from '../img/design.svg'
import intelligence from '../img/intelligence.svg'
import gamedev from '../img/game-dev.svg'
import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {upDownStaggerElement} from "./Animation";

gsap.registerPlugin(ScrollTrigger);

function ServicesSection(props) {
    const serviceRef = useRef();
    useEffect(() => {
        upDownStaggerElement(0,document.querySelector('.services').childNodes,serviceRef.current)
    }, [])

    return (
        <InnerLayout>
            <ServicesSectionStyled>
                <Title title={'preference'} span={'preference'}/>
                <div ref={serviceRef} className="services">
                    <div className='service-card'>
                        <ServiceCard
                            image={design}
                            title={'Front End'}
                            paragraph={`React 를 이용한 SPA 개발  Restful API를 통한 Backend 와의 통신 및 HTML, CSS , Vanila JS  
                              웹 기반의 다양한 툴이나 프로덕트를 개발하고 UI/UX를 개선하는걸 선호합니다.
                            `}
                        />
                    </div>
                    <div className='service-card'>
                        <div className="mid-card">
                            <ServiceCard
                                image={intelligence}
                                title={'BackEnd'}
                                paragraph={`Java 기반의 객체지향 설계 및 개발을 선호하며 RDBMS 중에는 MySQL, No SQL 에서는 mongoDB도 즐겨 사용합니다`}
                            />
                        </div>
                    </div>
                    <div className='service-card'>

                        <ServiceCard
                            image={gamedev}
                            title={'Artificial intelligence'}
                            paragraph={`지금도 우리 가까이에있고, 가까이 접근하는 인기척도 못느낄정도로 빠르게 접근한 AI 가 미래에는 삶의 더욱큰 일부분을 차지할 것이라고 생각합니다. 다양한 AI 플랫폼에 관심이 많습니다.`}
                        />
                    </div>

                    <div className='service-card'>

                        <ServiceCard
                            image={gamedev}
                            title={'Collaboration'}
                            paragraph={`주변 사람들과 소통하며 작업하는 것을 좋아하며, 서로 생각을 공유하면서 성장해가는것을 좋아합니다. 다른 사람들과 다양한 사고와 경험을 공유하기는 것을 즐겨합니다.`}
                        />
                    </div>
                </div>
            </ServicesSectionStyled>
        </InnerLayout>
    );
}

export const ServicesSectionStyled = styled.section`
  .services {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
    @media screen and (max-width: 950px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
    }
    .service-card{
      opacity: 1;
    }

  }
`;
export default ServicesSection;