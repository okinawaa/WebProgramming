import React from 'react';
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";

function KeyGuide(props) {
    const transition = {duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96]}
    return (
        <StyledKeyGuide exitBeforeEnter>
            <AnimatePresence>
                {
                    props.showGuide &&

                    <motion.div className='details'
                                initial={{opacity: 0, y: 20}}
                                animate={{
                                    opacity: 0.9,
                                    y: 0,
                                    transition: {delay: 1.2, ...transition}
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 0,
                                    transition: {delay: 0.6, ...transition}
                                }
                                }
                    >
                        < div className='location'><span>Click and drag your mouse, or press the ◀ ▶ keys, to look around</span></div>
                        <div style={{marginTop:'0.3rem'}} className='mua'>press the [W] [S] keys to move forwards and backwards.</div>
                    </motion.div>
                }
            </AnimatePresence>

        </StyledKeyGuide>
    );
}

const StyledKeyGuide = styled.div`
  z-index: 999;
  position: fixed;
  color: white;
  text-align: center;
  margin: auto;
  top: 3%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
`

export default KeyGuide;