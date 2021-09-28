import React, {useEffect, useRef, useState} from 'react';

import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";
import PrimaryButton from "../Components/PrimaryButton";
import {Link} from "react-router-dom";
import axios from "axios";

function ResumeDetailPage(props) {
    const params = props.match.params // can use also useParams()
    const [images,setImages] = useState([])


    useEffect(()=>{
        const getWorkingExperienceImages = async () => {
            const dbWEImages = await axios.post('/api/resume/workingExperienceImages',{title : params.title})
            setImages(dbWEImages.data);
            if(dbWEImages.data.length === 0){
                const dbEEImages = await axios.post('/api/resume/educationExperienceImages',{title : params.title})
                setImages(dbEEImages.data);
            }
        }
        getWorkingExperienceImages();
    },[])
//Hook to grab window size
    const size = useWindowSize();

    // Ref for parent div and scrolling div
    const imageGalleryContainerRef = useRef();
    const scrollContainer = useRef();

    // Configs
    const data = {
        ease: 0.1,
        current: 0,
        previous: 0,
        rounded: 0
    };

    // Run scrollrender once page is loaded.
    useEffect(() => {
        requestAnimationFrame(() => skewScrolling());
    }, []);


    // set the height of the body.
    useEffect(() => {
        setBodyHeight();
        return ()=>{
            document.body.style.height = `${size.height}px`
        }
    }, [size.height, scrollContainer, scrollContainer.current,images]);

    //Set the height of the body to the height of the scrolling div
    const setBodyHeight = () => {
        document.body.style.height = `${
            scrollContainer.current.getBoundingClientRect().height
        }px`;
    };

    // Scrolling
    const skewScrolling = () => {
        //Set Current to the scroll position amount
        data.current = window.scrollY;
        // Set Previous to the scroll previous position
        data.previous += (data.current - data.previous) * data.ease;
        // Set rounded to
        data.rounded = Math.round(data.previous * 100) / 100;

        // Difference between
        const difference = data.current - data.rounded;
        const acceleration = difference / size.width;
        const velocity = +acceleration;
        const skew = velocity * 20;

        //Assign skew and smooth scrolling to the scroll container
        if (scrollContainer && scrollContainer.current) {
            scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;
        }

        //loop vai raf
        requestAnimationFrame(() => skewScrolling());
    };


    return (
        <ImageGalleryContainer ref={imageGalleryContainerRef}>
            <div ref={scrollContainer} className="scroll">
                {images && images.map((image, index) => (
                    <div className="img-container" key={index}>
                        <img src={image.images} alt=""
                             style={{transform: index % 2 !== 0 ? 'translate3D(45%,0,0)' : 'translate3D(0,0,0)'}}/>
                    </div>
                ))}
                <Link className='link-to-hide' to={'/resume/'}>
                    <PrimaryButton title={'Back to resume page'}/>
                </Link>
            </div>
        </ImageGalleryContainer>
    );
}

const ImageGalleryContainer = styled.div`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  @media (max-width: 1200px) {
    z-index: 0;
  }
  .link-to-hide{
    display: none;
    @media (max-width: 1200px) {
      display: block;
    } 
  }
  
  .scroll {
    padding-top: 2vh;
    padding-bottom: 10vh;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .img-container {
    width: 700px;
    height: 420px;
    position: relative;
    margin: 200px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      margin-top: 200px;
    }

    @media (max-width: 480px) {
      width: 95%;
    }

    img {
      border: 5px solid var(--border-color);
      border-radius: 2%;
      width: 70%;
      height: auto;
      position: absolute;
      object-fit: contain;
    }
  }
`

export default ResumeDetailPage;