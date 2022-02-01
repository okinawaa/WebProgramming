import React from 'react';
import styled from "styled-components";
import {Button} from "../../utils/Button";

function LoadingGuide(props) {
    return (
        <StyledLoadingGuide>
            <Button loadingPercent={props.loadingPercent}>{props.loadingPercent.toFixed(0)}</Button>
            {/*<BackButton/>*/}
        </StyledLoadingGuide>
    );
}

const StyledLoadingGuide = styled.div`
  z-index: 9999;
  position: fixed;
  color: white;
  text-align: center;
  margin: auto;
  top: 70%;
  left: 50%;
  transform: translate3d(-50%,0,0);
  height: 8vh;
`

export default LoadingGuide;