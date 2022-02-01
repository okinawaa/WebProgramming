import React from 'react';
import {Html} from "@react-three/drei";
import {AnimatePresence, motion} from "framer-motion";

function HoverHtml({position,paragraph,image}) {
    const transition = {duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96]}
    return (
        <Html
            position={position ? position : [0,0,0]}
            scaleFactor={10} style={{pointerEvents: "none", color: 'white'}}
        >
            <div className="container content">
                <AnimatePresence exitBeforeEnter>
                    <motion.div className="image-circle"
                                initial={{opacity: 0, scale: 0}}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {...transition}
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 1,
                                    transition: {...transition}
                                }
                                }>
                        {
                            image ? <img src={`${image}`} alt='hoverImage'/>
                                : <div>
                                    {paragraph}
                                </div>

                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </Html>
    );
}

export default HoverHtml;