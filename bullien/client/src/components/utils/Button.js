import styled from "styled-components";
import {motion} from "framer-motion";

export const Button = styled.button`
  transform-origin: 0 0;
  width: 15vw;
  height: 6.55vh;
  font-size: 16px;
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  //border-radius: 5px;
  outline: none;
  border: 1px solid black;
  text-transform: uppercase;
  cursor: pointer;
  transition: ease background-color 250ms;

  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }

  ${props => props.loadingPercent && `  transform: scaleX(${props.loadingPercent / 100});
`}
`;


Button.defaultProps = {
    theme: "blue"
};

const theme = {
    blue: {
        default: "#041028",
        hover: "#020d1a"
    },

};


export const MotionButton = styled(motion.button)`
  transform-origin: 0 0;
  width: 15vw;
  height: 6.55vh;
  font-size: 16px;
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  //border-radius: 5px;
  outline: none;
  border: 1px solid black;
  text-transform: uppercase;
  cursor: pointer;
  transform-origin: 0 0;
  transition: ease background-color 250ms;
  

  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }

  ${props => props.loadingPercent && `  transform: scaleX(${props.loadingPercent / 100});
`}
`;