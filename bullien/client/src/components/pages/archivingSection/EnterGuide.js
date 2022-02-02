import React from 'react';
import styled from "styled-components";
import { MotionButton} from "../../utils/Button";
import {motion, AnimatePresence} from "framer-motion";

function EnterGuide(props) {
    const transition = {duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96]}

    return (
        <StyledEnterGuide>

            <MotionButton as={motion.button} onClick={() => props.setPressEnter(true)} theme='blue'
                    initial={{opacity: 0, y: 0, scaleX:0}}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scaleX:1,
                        transition: {transition}
                    }}>

                <AnimatePresence>
                <motion.div  initial={{opacity: 0, y: 1}}
                             animate={{
                                 opacity: 1,
                                 y: 0,
                                 transition: {delay:0.7,...transition}
                             }}>
                    ENTER
                </motion.div>
                </AnimatePresence>
            </MotionButton>
        </StyledEnterGuide>
    );
}

const StyledEnterGuide = styled.div`
  z-index: 100000;
  position: fixed;
  color: white;
  text-align: center;
  margin: auto;
  top: 70%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
`


export default EnterGuide;

