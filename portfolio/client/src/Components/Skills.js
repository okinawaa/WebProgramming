import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import ProgressBar from './ProgressBar';
import Button from "./Button";
import axios from "axios";


function Skills({buttonClicked, setButtonClicked}) {

    const [skillMenuItem, setSkillMenuItems] = useState([]);
    const [skillButton, setSkillButton] = useState([]);
    const [allSkills, setAllSkills] = useState([])

    useEffect(() => {
        const getSkills = async (req, res) => {
            const dbSkills = await axios.get('/api/resume/skills')
            setSkillMenuItems(dbSkills.data)
            setAllSkills(dbSkills.data)
            setSkillButton(['All', ...new Set(dbSkills.data.map(item => item.category))]);
        }
        getSkills();
    }, [])

    const filter = (button) => {
        if (button === 'All') {
            setSkillMenuItems(allSkills);
            return;
        }
        setButtonClicked(true);
        const resultData = [...allSkills];
        const filteredData = resultData.filter(item => item.category === button || item.subCategory === button);
        setSkillMenuItems(filteredData);
    }
    return (
        <SkillsStyled>
            <Title title={'My Skills'} span={'my skills'}/>
            <InnerLayout>
                <Button filter={filter} button={skillButton}/>
                <SkillContainer >

                    {
                        skillMenuItem.map(item => (
                            <ProgressBar key={item.title}
                                         title={item.title}
                                         width={item.width}
                                         text={item.text}
                            />
                        ))
                    }
                </SkillContainer>
            </InnerLayout>
        </SkillsStyled>
    )
}

const SkillsStyled = styled.section`

`;

const SkillContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 2rem;
  grid-column-gap: 3rem;
  min-height: 650px;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
    min-height: 1200px;
  }
`

export default Skills;