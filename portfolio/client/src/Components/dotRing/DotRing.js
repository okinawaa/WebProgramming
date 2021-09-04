import React, { useContext } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";
import './DotRing.css'
import styled from "styled-components";
const DotRing = () => {
    // 1.
    const { cursorType } = useContext(MouseContext);

    const { x, y } = useMousePosition();
    return (
        <>
            {/* 2. */}
            <Ring
                style={{ left: `${x}px`, top: `${y}px` }}
                className={"ring " + cursorType}
            />
            <Dot
                className={"dot " + cursorType}
                style={{ left: `${x}px`, top: `${y}px` }}
            />
        </>
    );
};

export default DotRing;

const Ring = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 22px;
  height: 22px;
  border: 2px solid var(--secondary-color);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  transition:width 200ms ease-out , height 200ms ease-out;
  -webkit-transition:width 200ms ease-out, height 200ms ease-out;
  will-change: width, height, transform, border;
  z-index: 999;
  pointer-events: none;
`
const Dot = styled.div`

  position: fixed;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: var(--white-color);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  z-index: 999;
  pointer-events: none;
`

