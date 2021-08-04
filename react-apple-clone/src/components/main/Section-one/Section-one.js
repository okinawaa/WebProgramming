import React, {useEffect, useRef, useState} from 'react';
import useWindowSize from "../../../hooks/useWindowSize";
import {transform, useTransform, useViewportScroll, motion} from "framer-motion";
import useImage from 'use-image'
function SectionOne(props) {
    const size = useWindowSize();

    const firstsceneInfo = {
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            videoImages: []
        },
        values: {
            videoImageCount: 300,
            imageSequence: [0, 299]
        }
    }
    const [sceneInfo, setSceneInfo] = useState(firstsceneInfo);
    const [ctx, setCtx] = useState(undefined);

    let canvas;
    let canvasRef = useRef();
    useEffect(() => {
        canvas = canvasRef.current;
        setCtx(canvas.getContext('2d'));
    }, [])

    const container = useRef();
    const heightRatio = window.innerHeight / 1080;
    // Scroll position
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let imgElem;
        for (let i = 0; i < sceneInfo.values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `../../../../assets/001/IMG_${6726 + i}.JPG`;
            sceneInfo.objs.videoImages.push(imgElem);
        }
    }, [])

    useEffect(() => {
        const scrollHeight = sceneInfo.heightNum * window.innerHeight;
        setSceneInfo({
            ...sceneInfo, ...{scrollHeight: scrollHeight}
        })
        container.current.style.height = `${scrollHeight}px`
        canvasRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }, [size.height, size.width])


    const calcValues = (values) => {
        let rv;
        const scrollHeight = sceneInfo.scrollHeight;
        const partScrollStart = 0
        const partScrollEnd = 1 * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;
        if (scrollPosition >= partScrollStart && scrollPosition <= partScrollEnd) {
            rv = (scrollPosition - partScrollStart) / partScrollHeight * (299 - 0) + 0;
        } else if (scrollPosition < partScrollStart) {
            rv = 0;
        } else if (scrollPosition > partScrollEnd) {
            rv = 299;
        }

        return rv;

    }

    useEffect(() => {
        if (sceneInfo.objs.videoImages[Math.round(calcValues())] && ctx) {
                console.log("asdasd")
                ctx.drawImage(sceneInfo.objs.videoImages[Math.round(calcValues())], 0, 0)
        }
    }, [scrollPosition, sceneInfo.scrollHeight,ctx])
    return (
        <>
            <section ref={container} className="scroll-section" id="scroll-section-0">
                <h1>AirMug Pro</h1>
                <div className="sticky-elem sticky-elem-canvas">
                    <canvas ref={canvasRef} id="video-canvas-0" width="1920" height="1080"></canvas>
                </div>
                <div className="sticky-elem main-message a">
                    <p>온전히 빠져들게 하는<br/>{scrollPosition} 세라믹</p>
                </div>
                <div className="sticky-elem main-message b">
                    <p>주변 맛을 느끼게 해주는<br/>주변 맛 허용 모드</p>
                </div>
                <div className="sticky-elem main-message c">
                    <p>온종일 편안한<br/>맞춤형 손잡이</p>
                </div>
                <div className="sticky-elem main-message d">
                    <p>새롭게 입가를<br/>찾아온 매혹</p>
                </div>
            </section>
        </>
    );
}

export default SectionOne;

