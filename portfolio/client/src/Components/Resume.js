import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import SmallTitle from '../Components/SmallTitle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import ResumeItem from '../Components/ResumeItem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import {ServicesSectionStyled} from "./ServicesSection";
import CertificationCard from "./CertificationCard";
import CheckIcon from '@material-ui/icons/Check';
import {upDownStaggerElement} from "./Animation";
import axios from "axios";
import SmallestTitle from "./SmallestTitle";

function Resume({buttonClicked}) {
    const briefcase = <BusinessCenterIcon/>
    const school = <SchoolIcon/>
    const certification = <CardMembershipIcon/>
    const check = <CheckIcon/>
    const workingExperienceRef = useRef();
    const educationExperienceRef = useRef();
    const certificationRef = useRef();
    const [certifications, setCertifications] = useState([]);
    const [workingExperiences, setWorkingExperiences] = useState([]);
    const [educationExperiences, setEducationExperiences] = useState([]);

    useEffect(() => {
        if (workingExperienceRef.current && educationExperienceRef.current && certificationRef.current && (certifications.length !== 0) && (workingExperiences.length !== 0) && (educationExperiences.length !== 0) ) {
            upDownStaggerElement(-50, document.querySelectorAll('.resume-content')[0].childNodes, workingExperienceRef.current, 0.3, 0.2)
            upDownStaggerElement(-50, document.querySelectorAll('.resume-content')[1].childNodes, educationExperienceRef.current, 0.3, 0.2)
            upDownStaggerElement(-50, document.querySelector('.services').childNodes, certificationRef.current, 0.3)
        }
    }, [workingExperienceRef,educationExperienceRef, certificationRef,certifications,workingExperiences,educationExperiences,buttonClicked])

    useEffect(() => {
        const getCertifications = async () => {
            const dbCertifications = await axios.get('/api/resume/certifications')
            setCertifications(dbCertifications.data)
        }
        getCertifications();
    }, [])

    useEffect(() => {
        const getWorkingExperiences = async () => {
            const dbWorkingExperiences = await axios.get('/api/resume/workingExperiences')
            setWorkingExperiences(dbWorkingExperiences.data)
        }
        getWorkingExperiences();
    }, [])

    useEffect(() => {
        const getEducationExperiences = async () => {
            const dbEducationExperiences = await axios.get('/api/resume/educationExperiences')
            setEducationExperiences(dbEducationExperiences.data)
        }
        getEducationExperiences();
    }, [])


    return (
        <ResumeStyled>
            <Title title={'Resume'} span={'resume'}/>
            <InnerLayout>
                <div className="small-title" ref={workingExperienceRef}>
                    <SmallTitle icon={briefcase} title={'Working Experience'}/>
                    <SmallestTitle icon={check} title={'파란색 글자를 클릭하면 앨범으로 이동합니다'}/>
                </div>
                <div className="resume-content">
                    {
                        workingExperiences.map((workingExperience) => (
                            <ResumeItem
                                key={workingExperience.title}
                                year={workingExperience.year}
                                title={workingExperience.title}
                                subTitle={workingExperience.subTitle}
                                text={workingExperience.text}
                            />
                        ))
                    }
                </div>
                <div className="small-title u-small-title-margin" ref={educationExperienceRef}>
                    <SmallTitle icon={school} title={'Education Experience'}/>
                    <SmallestTitle icon={check} title={'파란색 글자를 클릭하면 앨범으로 이동합니다'}/>

                </div>
                <div className="resume-content">
                    {
                        educationExperiences.map((educationExperience) => (
                            <ResumeItem
                                key={educationExperience.title}
                                year={educationExperience.year}
                                title={educationExperience.title}
                                subTitle={educationExperience.subTitle}
                                text={educationExperience.text}
                            />
                        ))
                    }


                </div>
                <div className="small-title u-small-title-margin" ref={certificationRef}>
                    <SmallTitle icon={certification} title={'Certification'}/>
                </div>
                <ServicesSectionStyled>
                    <div className="services">
                        {
                            certifications.map((certification) => (
                                <CertificationCard
                                    key={certification.id}
                                    image={certification.image}
                                    title={certification.title}
                                    List={certification.contents.split(",")}
                                />
                            ))
                        }
                    </div>
                </ServicesSectionStyled>
            </InnerLayout>
        </ResumeStyled>
    )
}


const ResumeStyled = styled.section`
  .small-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 3rem;
    @media screen and (max-width:700px){
      flex-direction: column;
    }
  }

  .u-small-title-margin {
    margin-top: 4rem;
  }

  .resume-content {
    border-left: 2px solid var(--border-color);
  }
`;
export default Resume