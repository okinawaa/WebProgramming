import React from 'react';
import styled from "styled-components";
import resume from '../img/resume.png';
import PrimaryButton from "./PrimaryButton";

function ImageSection(props) {
    return (
        <ImageSectionStyled>
            <div className="left-content">
                <img src={resume} alt=""/>
            </div>
            <div className="right-content">
                <h4>I am Chanhyuk <span>Park</span></h4>
                <p className="paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at commodi deserunt est ipsum
                    minus nam quia sed, temporibus?
                </p>
                <div className="about-info">
                    <div className="info-title">
                        <p>Full Name</p>
                        <p>Age</p>
                        <p>Nationality </p>
                        <p>Languages </p>
                        <p>Location</p>
                        <p>Service</p>
                    </div>
                    <div className="info">
                        <p>: Chanhyuk Park</p>
                        <p>: 25</p>
                        <p>: Korean </p>
                        <p>: Korean, Japanese, English </p>
                        <p>: Dongtan in Gyeonggi</p>
                        <p>: Junior Soph</p>
                    </div>
                </div>
                <PrimaryButton title={'asdad'}/>
            </div>


        </ImageSectionStyled>
    );
}

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width:1000px){
    flex-direction: column;
    .left-content{
      margin-bottom: 2rem;
    }
  }
  .left-content{
    width: 100%;
    img{
      width: 95%;
      object-fit: cover;
    }
  }
  .right-content{
    width: 100%;
    h4{
      font-size: 2rem;
      color: var(--white-color);
      span{
        font-size: 2rem;
      }
    }
    .paragraph{
      padding: 1rem 0;
    }
    .about-info{
      display: flex;
      padding-bottom: 1.4rem;
      .info-title{
        padding-right: 3rem;
        p{
          font-weight: 600;
        }
      }
      .info-title, .info{
        p{
          padding: .3rem 0;
        }
      }
    }
  }
`;
export default ImageSection;