import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import SmallTitle from '../Components/SmallTitle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import ResumeItem from '../Components/ResumeItem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import {ServicesSectionStyled} from "./ServicesSection";

import workingExperiences from "../data/workingExperiences";
import educationExperiences from "../data/educationExperiences";
import certifications from "../data/certifications";
import CertificationCard from "./CertificationCard";
import {upDownStaggerElement} from "./Animation";

function Resume() {
    const briefcase = <BusinessCenterIcon/>
    const school = <SchoolIcon/>
    const certification = <CardMembershipIcon/>
    const workingExperienceRef = useRef();
    const educationExperienceRef = useRef();
    const certificationRef = useRef();
    useEffect(() => {
        upDownStaggerElement(-50, document.querySelectorAll('.resume-content')[0].childNodes, workingExperienceRef.current, 0.3, 0.2)
        upDownStaggerElement(-50, document.querySelectorAll('.resume-content')[1].childNodes, educationExperienceRef.current, 0.3, 0.2)
        upDownStaggerElement(-50, document.querySelector('.services').childNodes, certificationRef.current, 0.3)
    }, [workingExperienceRef,workingExperienceRef.current,educationExperienceRef,educationExperienceRef.current,certificationRef,certificationRef.current])

    return (
        <ResumeStyled>
            <Title title={'Resume'} span={'resume'}/>
            <InnerLayout>
                <div className="small-title" ref={workingExperienceRef}>
                    <SmallTitle icon={briefcase} title={'Working Experience'}/>
                </div>
                <div className="resume-content" >
                    {
                        workingExperiences.map((workingExperience) => (
                            <ResumeItem
                                key={workingExperience.id}
                                id={workingExperience.id}
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
                </div>
                <div className="resume-content" >
                    {
                        educationExperiences.map((educationExperience) => (
                            <ResumeItem
                                key={educationExperience.id}
                                id={educationExperience.id}
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
                                    List={certification.List}
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
    padding-bottom: 3rem;
  }

  .u-small-title-margin {
    margin-top: 4rem;
  }

  .resume-content {
    border-left: 2px solid var(--border-color);
  }
`;
export default Resume