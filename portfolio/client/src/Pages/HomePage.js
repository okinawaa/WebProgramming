import React from 'react';
import styled from "styled-components";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GithubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'
import {Suspense} from "react";
import Earth from '../Components/earth/earth'
import {Canvas} from '@react-three/fiber'

function HomePage(props) {
    return (
        <HomePageStyled>

            <CanvasContainer>
                <Canvas>
                    <Suspense fallback={null}>
                        <Earth theme={props.theme}/>
                    </Suspense>
                </Canvas>
            </CanvasContainer>
            <div className="typography">
                <h1>Hi I'm <span>Chanhyuk Park</span></h1>
                <p>
                    I am a poor stack developer based in republic of korea.
                    <br/>
                    Thank you so much for coming all this way to interact with me.
                    <br/>
                    Please wait a moment for our earth.
                </p>
                <div className="icons">
                    <a onClick={() => window.open('https://www.linkedin.com/in/%EC%B0%AC%ED%98%81-%EB%B0%95-43095721b/', '_blank')} className="icon i-linkedin">
                        <LinkedInIcon/>
                    </a>
                    <a onClick={() => window.open('https://github.com/ChanhyukPark-Tech', '_blank')}
                       className="icon i-github">
                        <GithubIcon/>
                    </a>
                    <a onClick={() => window.open('https://www.instagram.com/yokattadesune/', '_blank')}
                       className="icon i-instagram">
                        <InstagramIcon/>
                    </a>
                </div>
            </div>
        </HomePageStyled>
    );
}

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`

const HomePageStyled = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;

  .typography {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    width: 80%;

    p {
      margin-top: 1rem;
      font-weight: bold;
      font-size: 1.3rem;
      color: var(--greet-paragraph-white-color);
    }

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;

      .icon {
        border: 2px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all .4s ease-in-out;
        cursor: pointer;

        &:hover {
          border: 2px solid black;
          color: var(--primary-color)
        }

        &:not(:last-child) {
          margin-right: 1rem;
        }

        svg {
          margin: .5rem;
        }
      }

      .i-facebook {
        &:hover {
          border: 2px solid #4267B2;
          color: #4267B2;
        }
      }

      .i-github {
        &:hover {
          border: 2px solid #6cc644;
          color: #6cc644;
        }
      }

      .i-instagram {
        &:hover {
          border: 2px solid #C13584;
          color: #C13584;
        }
      }
    }
  }


`;

export default HomePage;
