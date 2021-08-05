import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
// import resume from 'https://res.cloudinary.com/dvrcr0hkb/image/upload/v1628129975/resume_hfqvkt.png';
import PrimaryButton from "./PrimaryButton";
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import {upDownStaggerElement, upDownElement} from "./Animation";
import {Link} from "react-router-dom";

function ImageSection(props) {
    useEffect(() => {
        upDownElement(-200, document.querySelector('.left-content img'), undefined, 0)
        upDownStaggerElement(-50, [document.querySelector('.right-content h4'), document.querySelector('.right-content p')], undefined, 0.1)
        upDownStaggerElement(-50, document.querySelector('.info-title').childNodes, undefined, 0.1, 0.2)
        upDownStaggerElement(-50, document.querySelector('.info').childNodes, undefined, 0.1, 0.2)

    }, [])
    return (
        <ImageSectionStyled>
            <div className="left-content">
                <img src='https://res.cloudinary.com/dvrcr0hkb/image/upload/v1628129975/resume_hfqvkt.png' alt=""/>
            </div>
            <div className="right-content">
                <h4>ChanHyuk<span> Park</span></h4>
                <p className="paragraph">
                    I'm a Full-stack Developer located in South Korea.<br/> I'm working on passion for UI effects,
                    dynamic user experiences<br/>
                    I enjoy interacting with various people and working.
                </p>
                <div className="about-info">
                    <div className="info-title">
                        <p>Birth</p>
                        <p>Nationality </p>
                        <p>Languages </p>
                        <p>Location</p>
                        <p>Service</p>
                    </div>
                    <div className="info">
                        <p><TrendingFlatIcon/>1997.09.02</p>
                        <p><TrendingFlatIcon/>Korean </p>
                        <p><TrendingFlatIcon/>KR,EN,JP</p>
                        <p><TrendingFlatIcon/>Dongtan</p>
                        <p><TrendingFlatIcon/>Junior Soph</p>
                    </div>
                </div>
                <Link to='/contact'>
                    <PrimaryButton title={'CONTACT'}/>
                </Link>
            </div>


        </ImageSectionStyled>
    );
}

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .left-content {
      margin-bottom: 2rem;
    }
  }

  .left-content {
    width: 100%;

    img {
      width: 95%;
      object-fit: cover;
    }
  }

  .right-content {
    width: 100%;

    h4 {
      font-size: 2rem;
      color: var(--white-color);

      span {
        font-size: 2rem;
      }
    }

    .paragraph {
      padding: 1rem 0;
      line-height: 1.4rem;
    }

    .about-info {
      display: flex;
      padding-bottom: 1.4rem;

      .info-title {
        padding-right: 3rem;

        p {
          font-weight: 600;
        }
      }

      .info-title, .info {
        p {
          padding: .3rem 0;
          display: flex;
          align-items: center;

          svg {
            margin-right: 2rem;

          }
        }
      }
    }
  }
`;
export default ImageSection;