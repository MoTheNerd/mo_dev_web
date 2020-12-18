import React from 'react';
import menuButton from '../../Assets/menu-button.svg';
import homeButton from '../../Assets/momo-icon.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { setState } from 'litsy';

interface NavBarProps {

}

interface NavBarState {
  navPanelIsOpen: boolean
}

export class NavBar extends React.Component<NavBarProps, NavBarState> {

  public readonly state: NavBarState = {
    navPanelIsOpen: false
  }

  render() {
    return (
      <NavBarContainer>
          <Link to="/">
            <HomeImage src={homeButton} />
          </Link>
          <MenuImage onClick={() => {
            setState("mohammad.dev.nav.isShown", true, "volatile");
          }} src={menuButton} />
      </NavBarContainer>
    )
  }
}

const NavBarContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100%;
`

const HomeImage = styled.img`
  cursor: pointer;
  height: 40px;
  position: fixed;
  top: 30px;
  left: 30px;
`
const MenuImage = styled.img`
  cursor: pointer;
  height: 25px;
  position: fixed;
  top: 37.5px;
  right: 37.5px;
`