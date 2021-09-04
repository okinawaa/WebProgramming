import React, {useContext} from 'react';
import styled from 'styled-components'
import {MouseContext} from "../context/mouse-context";

function PrimaryButton({title}) {
    const { cursorChangeHandler } = useContext(MouseContext);

    return (
        <PrimaryButtonStyled onMouseEnter={() => cursorChangeHandler("hovered")}
                             onMouseLeave={() => cursorChangeHandler("")}>
            {title}
        </PrimaryButtonStyled>


    );
}


const PrimaryButtonStyled = styled.div`
  z-index: 500;
  background-color: var(--primary-color);
  padding: 0.8rem 2.5rem;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  text-transform: uppercase;
  position: relative;
  &::after{
    content:"";
    position: absolute;
    width: 0;
    height: .2rem;
    transition: all .4s ease-in-out;
    left: 0;
    bottom: 0;
    opacity: 0.7;
  }
  &:hover::after {
    width: 100%;
    background-color: var(--white-color);

  }
`
export default PrimaryButton;
