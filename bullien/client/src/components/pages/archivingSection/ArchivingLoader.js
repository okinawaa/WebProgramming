import React from 'react';
import {Loader} from "@react-three/drei";
import backgroundImage from './images/backgroundImage.png'

function ArchivingLoader({loadingPercent, setLoadingPercent,setFinishLoading}) {
    return (
        <Loader
            containerStyles={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: `blur(${loadingPercent / 25}px)`,
            }}
            innerStyles={{
                display: 'none',
            }} // Inner container styles
            barStyles={{
                display: 'none',
            }} // Loading-bar styles
            dataStyles={{
                // display: 'none',
                fontSize: '4rem'
            }}
            dataInterpolation={(p) => {
                if(p === 100){
                    setFinishLoading(true)
                }
                setLoadingPercent(p.toFixed(2) * 1)
            } // Text
            }
        />


    );
}

export default ArchivingLoader;
