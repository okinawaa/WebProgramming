import React from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import SmallTitle from '../Components/SmallTitle';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SchoolIcon from '@material-ui/icons/School';
import ResumeItem from '../Components/ResumeItem';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import {ServiceCardStyled} from "./ServiceCard";
import {ServicesSectionStyled} from "./ServicesSection";
import global from '../img/global.png'
import computer from '../img/computer.png'
import gpa from '../img/gpa.png'

function Resume() {
    const briefcase = <BusinessCenterIcon/>
    const school = <SchoolIcon/>
    const certification = <CardMembershipIcon/>
    return (
        <ResumeStyled>
            <Title title={'Resume'} span={'resume'}/>
            <InnerLayout>
                <div className="small-title">
                    <SmallTitle icon={briefcase} title={'Working Experience'}/>
                </div>
                <div className="resume-content">
                    <ResumeItem
                        year={'2019.5 - 2019.12'}
                        title={'Hotel Front Service'}
                        subTitle={'Osaka Japan FP HOTELS'}
                        text={'일본 비즈니스 호텔의 프론트 업무를 담당하므로써 엑셀을 이용한 예약관리 및 손님들의 편의성을 증진시키기위한 기획 & 마케팅 '}
                    />

                </div>
                <div className="small-title u-small-title-margin">
                    <SmallTitle icon={school} title={'Qualifications'}/>
                </div>
                <div className="resume-content ">
                    <ResumeItem
                        year={'2016 - 2021'}
                        title={'Hanyang University ERICA Campus'}
                        subTitle={'Dual Degree [ Software Engineering , Mechanical Engineering]'}
                        text={' '}
                    />
                    <ResumeItem
                        year={'2019.1 - 2020.1'}
                        title={'Working Holiday in Japan'}
                        subTitle={'Osaka'}
                        text={'국가의 장벽을 넘어 사람들과 소통하는것을 즐겨하는 성격을 활용해 일본에서 1년동안 다양한 일을 통해 다양한 커뮤니케이션 능력향상과 서비스능력 향상'}
                    />

                </div>
                <div className="small-title u-small-title-margin">
                    <SmallTitle icon={certification} title={'Certification'}/>
                </div>
                <ServicesSectionStyled>
                    <div className="services">
                        <CertificationCard
                            image={global}
                            title={'Language'}
                            List={[`TOEIC : 885`, `JLTP : N2`, `OPIC Japan : Advanced Level(AL)`]}
                        />
                        <CertificationCard
                            image={computer}
                            title={'Computer'}
                            List={[`컴퓨터활용능력 1급`, `2020 아두이노 기초 및 심화 (IoT Smart Home 및 자율주행) 45시간 이수`, `기업에서 사용하는 실전 빅데이터 기술 기초 이수`]}

                        />
                        <CertificationCard
                            image={gpa}
                            title={'GPA'}
                            List={[`Total GPA : 4.3`, `Major GPA : 4.43`]}
                        />
                    </div>
                </ServicesSectionStyled>
            </InnerLayout>
        </ResumeStyled>
    )
}

function CertificationCard({image, title, List}) {
    return (
        <ServiceCardStyled>
            <div className="container">
                <img src={image} alt=""/>
                <h4>{title}</h4>
                <ul>
                    {
                        List.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        </ServiceCardStyled>
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