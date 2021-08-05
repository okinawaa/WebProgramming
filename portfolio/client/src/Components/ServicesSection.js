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
        upDownStaggerElement(-50,document.querySelector('.services').childNodes,serviceRef.current)
    }, [])

    return (
        <InnerLayout>
            <ServicesSectionStyled>
                <Title title={'Services'} span={'services'}/>
                <div ref={serviceRef} className="services">
                    <div className='service-card'>
                        <ServiceCard
                            image={design}
                            title={'Web Design'}
                            paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod.'}
                        />
                    </div>
                    <div className='service-card'>
                        <div className="mid-card">
                            <ServiceCard
                                image={intelligence}
                                title={'Artificial Intelligence'}
                                paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod.'}
                            />
                        </div>
                    </div>
                    <div className='service-card'>

                        <ServiceCard
                            image={gamedev}
                            title={'Game Development'}
                            paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod.'}
                        />
                    </div>

                </div>
            </ServicesSectionStyled>
        </InnerLayout>
    );
}

const ServicesSectionStyled = styled.section`
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