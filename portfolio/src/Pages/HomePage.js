import React from 'react';
import styled from "styled-components";
import Particle from "../Components/Particles";
import FacebookIcon from '@material-ui/icons/Facebook'
import GithubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'

function HomePage(props) {
    return (
        <HomePageStyled>
            <div className="p-particles-js">
                <Particle/>
            </div>
            <div className="typography">
                <h1>Hi I'm <span>Chanhyuk Park</span></h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda dolore earum eius eos libero
                    magnam porro, quia sit suscipit?
                </p>
                <div className="icons">
                    <a href='/' className="icon i-facebook">
                        <FacebookIcon/>
                    </a>
                    <a href='https://github.com/ChanhyukPark-Tech' className="icon i-github">
                        <GithubIcon/>
                    </a>
                    <a href='https://www.instagram.com/yokattadesune/' className="icon i-instagram">
                        <InstagramIcon/>
                    </a>
                </div>
            </div>
        </HomePageStyled>
    );
}


const HomePageStyled = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;

  .p-particles-js {
    position: absolute;
    top: 0;
    left: 0;

  }

  .typography {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    width: 80%;

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
