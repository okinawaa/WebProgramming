
import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
// import {Link as LinkS} from 'react-scroll'


export const Nav = styled.nav`
  background: transparent;
  height: 40px;
  margin-top:-40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top:0;
  left:0;
  
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  height: 40px;
  z-index: 1;
  width: 100%;
`

export const NavLogo = styled(LinkR)`
  margin-top: 0.2rem;
  color: #fff;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  font-weight: bold;
  text-decoration: none;
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

 
`


export const NavLinks = styled(LinkR)`
  color:#fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-size: 1.5rem;
  &.active {
    border-bottom: 3px solid #01bf71;
  }

  
`

export const NavContact = styled.nav`
  display: flex;
  align-items: center;
`
