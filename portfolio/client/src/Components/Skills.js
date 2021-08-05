import React, {useState} from 'react'
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import ProgressBar from './ProgressBar';
import Button from "./Button";
import skills from "../data/skiils";

const allButtons = ['All', ...new Set(skills.map(item => item.category))]

function Skills() {
    const [skillMenuItem, setSkillMenuItems] = useState(skills);
    const [skillButton, setSkillButton] = useState(allButtons);

    const filter = (button) => {
        if (button === 'All') {
            setSkillMenuItems(skills);
            return;
        }
        const filteredData = skills.filter(item => item.category === button || item.subCategory === button);
        setSkillMenuItems(filteredData);
    }
    return (
        <SkillsStyled>
            <Title title={'My Skills'} span={'my skills'}/>
            <InnerLayout>
                <Button filter={filter} button={skillButton}/>
                <div className="skills">

                {
                    skillMenuItem.map(item=>(
                        <ProgressBar key={item.title}
                            title={item.title}
                            width={item.width}
                            text={item.text}
                        />
                    ))
                }
                </div>
            </InnerLayout>
        </SkillsStyled>
    )
}

const SkillsStyled = styled.section`
  .skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Skills;