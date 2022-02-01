import React, {useEffect, useRef, useState} from 'react';
import {Controller, Scene} from "react-scrollmagic";
import Sequence from './Sequence'
import styled from "styled-components";
import ScrollChecker from "./ScrollChecker";
import video from './videos/wormHall.mp4'

function LandingSection(props) {
    const ref = useRef();
    const [scrollOver, setScrollOver] = useState(false);
    const clickNavBanner = props.clickNavBanner
    const vidRef = useRef()
    useEffect(() => {
        if (scrollOver) {
            vidRef.current.play();
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [scrollOver])
    useEffect(() => {
        document.body.style.overflow = ""
    }, [])

    useEffect(() => {
        if (vidRef && vidRef.current && clickNavBanner) {
            document.body.style.overflow = ""
        }
    }, [clickNavBanner])
    return (
        <>
            <Controller>
                <div className='forErrorDetector' style={{position: 'relative'}}>

                    <Scene duration="1200%" triggerHook="onLeave" pin>
                        {progress => (
                            <SequenceContainer className={progress}>
                                <Sequence ref={ref} progress={progress}/>
                            </SequenceContainer>
                        )}
                    </Scene>
                    {
                        scrollOver && <video style={{
                            width: '100%',
                            height: '100vh',
                            objectFit: 'cover',
                            position: 'absolute',
                            bottom: '0'
                        }}
                                             ref={vidRef}
                                             type='video/mp4'
                                             src={video}
                                             playsInline
                                             muted={true}
                                             onEnded={() => {
                                                 props.history.push('/archive')
                                             }}
                        />
                    }
                </div>

                <ScrollChecker history={props.history} setScrollOver={setScrollOver}/>
            </Controller>
        </>
    );
}

const SequenceContainer = styled.div`
  height: 100vh;
  position: relative;
`

// const WormHallVideo = styled.video`
//   width: 100%;
//   height: 100vh;
//   object-fit: cover;
//   position: absolute;
//   bottom: 0;
// `

export default LandingSection;
