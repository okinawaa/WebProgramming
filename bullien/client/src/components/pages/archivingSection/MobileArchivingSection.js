import React, {useEffect, useRef, useState} from 'react';
import backgroundImage from "./images/backgroundImage.png";
import styled from 'styled-components'
import video from './videos/mobileArchiving.mp4'
function MobileArchivingSection(props) {
    const [clickCircle, setClickCircle] = useState(false);
    const [clickPause, setClickPause] = useState(false);
    const vidRef = useRef();
    useEffect(() => {
        if (clickCircle) {
            vidRef.current.play();
        }
    }, [clickCircle,clickPause])
    useEffect(()=>{
        if(clickPause && vidRef && vidRef.current){
            vidRef.current.pause();
            setClickCircle(false);
            setClickPause(false);
        }
    },[clickPause,clickCircle])
    return (
        <>
            <ContentContainer>
                <TextContent>
                    <h1>Your uncertain archive is not yet available for your device</h1>
                    <span>If you want to see our desktop version click the circle</span>
                </TextContent>
                <CircleButton onClick={() => {
                    setClickCircle(true)
                }}/>
                {
                    clickCircle && <video style={{
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
                                              window.location.reload()
                                          }
                                          }
                    />
                }{
                clickCircle && <PauseButton onClick={() => setClickPause(true)} theme={'blue'}>pause</PauseButton>

            }
            </ContentContainer>

        </>
    );
}

const ContentContainer = styled.div`
  height: 100vh !important;
  width: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  color: white;
  position: relative;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    margin: 4rem 1rem;
  }

  span {
    text-align: center;
    font-size: 1rem;
    margin: 0 1rem;
  }
`
const CircleButton = styled.button`
  width: 13vh;
  height: 13vh;
  background-color: transparent;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border: none;
`

const theme = {
    blue: {
        default: "#041028",
        hover: "#020d1a"
    },

};
const PauseButton = styled.button`
  z-index: 999;
  color: white;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: ${(props) => theme[props.theme].default};
  width: 15vw;
  height: 7vh;
  border:none;
`
export default MobileArchivingSection;