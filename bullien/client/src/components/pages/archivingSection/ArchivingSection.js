import React, {useState, Suspense, useRef, useEffect} from "react";
import {Light} from "./lights/Light";
import {FlyControls} from "@react-three/drei";
import {StyledComponents} from "./StyledComponents";
import './text.css'
import Kakao from "./assets/Kakao";
import BullStreet from "./assets/BullStreet";
import PostBox from "./assets/PostBox";
import TwoDom from "./assets/TwoDom";
import NeonKoreanVer from "./assets/NeonKoreanVer";
import NeonEnglishVer from "./assets/NeonEnglishVer";
import ArchivingLoader from "./ArchivingLoader";
import EnterGuide from "./EnterGuide";
import LoadingGuide from "./LoadingGuide";
import KeyGuide from "./KeyGuide";
import {neonEnglishVerClick, neonKoreanVerClick} from "./signButtonEventHandler";
import {Rig} from "./Rig";
import NeonJapan from "./assets/NeonJapan";
import KoreaBox from './assets/KoreaBox'
import * as THREE from "three";
import {BrowserView, MobileView} from 'react-device-detect';
import MobileArchivingSection from "./MobileArchivingSection";
import Barbershop from "./assets/Barbershop";


function ArchivingSection(props) {

    const [glbHash, setGlbHash] = useState(0);
    const [pressEnter, setPressEnter] = useState(false);
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [finishLoading, setFinishLoading] = useState(false);
    const [showGuide, setShowGuide] = useState(true);
    const flyControls = useRef()
    const handleKeydown = e => {
        if (e.key === 'Enter') {
            setPressEnter(true);
        }
        if (e.key === 'w') {
            setShowGuide(false)
        }
    }

    useEffect(() => {
        setGlbHash(Date.now())
    }, [])
    useEffect(() => {
        setPressEnter(false);
    }, [])
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown)
    }, [])
    return (
        <>
            <MobileView>
                <MobileArchivingSection history={props.history}/>
            </MobileView>
            <BrowserView>
                {finishLoading && !pressEnter && <EnterGuide setPressEnter={setPressEnter}/>}
                {!finishLoading && <LoadingGuide loadingPercent={loadingPercent}/>}
                {finishLoading && pressEnter && <KeyGuide showGuide={showGuide}/>}
                <StyledComponents onCreated={({gl}) => {
                    gl.toneMapping = THREE.NoToneMapping
                }} concurrent camera={{far: 5000}} pressEnter={pressEnter}>
                    <Suspense fallback={null}>
                        <Rig pressEnter={pressEnter}>
                            <Light/>
                            <TwoDom onClick={() => {
                                setPressEnter(true);
                            }}/>
                            <BullStreet/>
                            <group>
                                <Kakao/>
                                <NeonKoreanVer onClick={(e) => neonKoreanVerClick(e, props.history)} glbHash={glbHash}/>
                                <NeonEnglishVer onClick={(e) => neonEnglishVerClick(e, props.history)}/>
                                <PostBox/>
                                <NeonJapan/>
                                <KoreaBox/>
                                <Barbershop/>
                            </group>

                        </Rig>
                    </Suspense>
                    <FlyControls ref={flyControls} dragToLook rollSpeed={0.5} movementSpeed={2}/>
                </StyledComponents>
                <ArchivingLoader loadingPercent={loadingPercent}
                                 setLoadingPercent={setLoadingPercent} setFinishLoading={setFinishLoading}
                                 finishLoading={finishLoading}
                />
            </BrowserView>

        </>
    );
}


export default ArchivingSection;

