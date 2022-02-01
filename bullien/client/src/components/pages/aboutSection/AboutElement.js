import styled from 'styled-components'
import {motion} from "framer-motion";

export const AboutContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  height: 100vh;
  z-index: 1;
  width: 100vw;
  color: white;
  overflow: hidden;
`
export const MotionImg = styled(motion.img)`
  width: 400px;
  height: 100px;
  
`

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    height: 20%;
  }
`

export const MotionAboutParagraphContent = styled(motion.div)`
  
`

export const AboutTitle = styled.h1`
  font-size: 4rem;
  font-family: 'Bebas Neue', cursive;
  letter-spacing: 0.2rem;
  margin-top: 5rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 960px) {
    display: none;
  }
`

export const AboutParagraph = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`

