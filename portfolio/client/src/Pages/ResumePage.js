import React, {useState} from 'react';
import Skills from '../Components/Skills';
import { MainLayout} from '../styles/Layouts';
import Resume from '../Components/Resume';



function ResumePage() {
    const [buttonClicked,setButtonClicked] = useState(false);
    return (
        <MainLayout>
            <Skills buttonClicked={buttonClicked} setButtonClicked={setButtonClicked}/>
            <Resume buttonClicked={buttonClicked} />
        </MainLayout>
    )
}

export default ResumePage