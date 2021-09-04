import React, {useEffect, useState} from 'react';
import portfolios from '../data/portfolios';
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import ImageSlider from "../Components/ImageSlider";
import {sliderData2} from "../data/sliderData";

function PortDetailPage(props) {
    const [portfolioItem, setPortfolioItem] = useState(null);
    const params = props.match.params // can use also useParams()
    const transition = {duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96]}

    useEffect(() => {
        if (params.id) {
            portfolios.forEach(item => {
                if (item.id === params.id * 1) {
                    setPortfolioItem(item)
                }
            })
        }
    }, [params.id])
    console.log(window.innerHeight)
    return (
        <AnimatePresence>
            {
                portfolioItem &&

                <StyledPortDetailContainer>
                    <PortContent>
                        <PortTitle>
                            {portfolioItem.title}
                            <ImageSliderContainer initial={{y: ((window.innerHeight * 1) / 4) ,opacity:0.4}}
                                        animate={{
                                            y: 0,
                                            opacity:1,
                                            transition: {delay: 0.5, ...transition}
                                        }}>
                                <ImageSlider slides={portfolioItem.image}/>

                            </ImageSliderContainer>

                        </PortTitle>

                        <MotionPortParagraphContent initial={{opacity: 0, y: 0, scale: 1}}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1,
                                                        transition: {delay: 1.5, ...transition}
                                                    }}>
                            <PortTeam>
                                {portfolioItem.team}
                            </PortTeam>
                            {
                                portfolioItem.detailContents.map((detailContent) => (
                                    <PortParagraphContainer key={detailContent.id}>
                                        <PortParagraphTitle>
                                            {detailContent.Title}
                                        </PortParagraphTitle>
                                        <PortParagraph>
                                            {detailContent.Content}
                                        </PortParagraph>
                                    </PortParagraphContainer>
                                ))
                            }

                        </MotionPortParagraphContent>
                    </PortContent>
                </StyledPortDetailContainer>
            }
        </AnimatePresence>
    );
}

const StyledPortDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const PortTeam = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const ImageSliderContainer = styled(motion.div)`
  margin-top: 2rem;

  img{
    border: 5px solid  var(--border-color);
    border-radius: 4%;
    width: 30vw;
    height: 30vh;
    object-fit: cover;
    @media screen and (max-width: 550px) {
      border: none;
      width: 100%;
      height: 100%;
      object-fit: contain;
      overflow-x:hidden;

    }
  }
`
const PortParagraphContainer = styled.div`
  display: flex;
`
const PortTitle = styled.h1`
  font-size: 4rem;
  font-family: 'Bebas Neue', cursive;
  letter-spacing: 0.2rem;
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  
  @media screen and (max-width: 960px) {
    font-size: 2rem;
  }
`


export const MotionPortParagraphContent = styled(motion.div)`

`

export const PortParagraphTitle = styled.span`
  font-size: 1.2rem;
  margin-right: 1rem;
  font-weight: bold;
`

export const PortParagraph = styled.p`
  margin-bottom: 3rem;
  max-width: 30vw;
  line-height: 2rem;
  white-space: pre-line;
  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`

export const PortContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    height: 20%;
  }
`
export default PortDetailPage;