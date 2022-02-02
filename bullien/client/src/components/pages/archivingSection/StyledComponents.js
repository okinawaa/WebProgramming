import styled from "styled-components";
import {Canvas} from "@react-three/fiber";
import backgroundImage from "./images/backgroundImage.png";

export const StyledComponents = styled(Canvas)`
  height: 100vh !important;
  width: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  filter:${props => props.pressEnter ? `blur(0px)` : `blur(5px)` } ;
  
`

export const GuideComponent = styled.div`
  z-index: 555;
  position: absolute;
  top:10%;
  left:50%;
  transform: translate3d(-50%,0,0);
  color:white;
`