import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import {upDownStaggerElement, upDownElement} from "./Animation";
import {Link} from "react-router-dom";
import ImageSlider from "./ImageSlider";
import {sliderData} from '../data/sliderData';
import {MouseContext} from "../context/mouse-context";

function ImageSection(props) {
    const { cursorChangeHandler } = useContext(MouseContext);

    useEffect(() => {
        upDownElement(-200, document.querySelector('.left-content img'), undefined, 0)
        upDownStaggerElement(-50, [document.querySelector('.right-content h4'), document.querySelector('.right-content p')], undefined, 0.1)
        upDownStaggerElement(-50, document.querySelector('.info-title').childNodes, undefined, 0.1, 0.2)
        upDownStaggerElement(-50, document.querySelector('.info').childNodes, undefined, 0.1, 0.2)

    }, [])
    return (
        <ImageSectionStyled>
            <div className="left-content">
                <ImageSlider slides={sliderData}/>
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
                <Link to='/contact' onMouseEnter={() => cursorChangeHandler("hovered")}
                      onMouseLeave={() => cursorChangeHandler("")}>
                    <PrimaryButton title={'CONTACT'}/>
                </Link>
            </div>


        </ImageSectionStyled>
    );
}

const ImageSectionStyled = styled.div`
  display: flex;
  margin-top: 2rem;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .left-content {
      margin-bottom: 2rem;
    }
  }

  .left-content {
    width: 100%;
    margin-right: 2rem;

    img {
      border-radius: 4%;
      border: 5px solid var(--border-color);
      max-width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .right-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

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

      text-align: center;
      justify-content: center;

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