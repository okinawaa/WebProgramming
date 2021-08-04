import React from 'react';
import SectionOne from './Section-one/Section-one'
import SectionTwo from "./Section-two/Section-two";
import SectionThree from "./Section-three/Section-three";
import SectionFour from "./Section-four/Section-four";

function MainSection(props) {

    return (<>
            <SectionOne/>
            <SectionTwo/>
            <SectionThree/>
            <SectionFour/>
        </>
    );
}

export default MainSection;