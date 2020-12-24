import React from 'react';
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { subscribeToState, setState } from 'litsy'
import backsvg from '../../Assets/back-button.svg'

let navItems = [
  { to: "/", title: "Home", isActive: true },
  { to: "/portfolio", title: "Portfolio", isActive: true },
  { to: "/contact", title: "Contact", isActive: true },
  { to: `/login`, title: `Login`, isActive: true },
  { to: `/dashboard`, title: `Dashboard`, isActive: false }
];

interface NavPanelProps {

}
interface NavPanelState {
  isShown: boolean
  animateFinished: boolean
}

export class NavPanel extends React.Component<NavPanelProps, NavPanelState> {

  public readonly state: NavPanelState = {
    isShown: false,
    animateFinished: true
  }

  delayed() {
    this.setState.bind(this)({ animateFinished: true })
  }

  componentDidMount() {
    setState("mohammad.dev.nav.isShown", false, "volatile")
    subscribeToState("mohammad.dev.nav.isShown", "navPanel", (isShown: boolean) => {
      this.setState.bind(this)({ isShown: isShown })
      this.setState.bind(this)({ animateFinished: false })
      if (!isShown) {
        setTimeout(this.delayed.bind(this), 300)
      }
    }, "volatile")
    subscribeToState("mohammad.dev.auth.authToken", "NavPanel", (token: string) => {
      navItems = navItems.map(a => a.to === `/login` ? { ...a, isActive: token && token !== "" ? false : true } : a)
      navItems = navItems.map(a => a.to === `/dashboard` ? { ...a, isActive: token && token !== "" ? true : false } : a)
      this.forceUpdate.bind(this)()
    }, "persist")
  }

  render() {
    return (
      <>
        <DarkenBG isShown={this.state.isShown} onClick={() => {
          setState("mohammad.dev.nav.isShown", false, "volatile")
        }}>
        </DarkenBG>
        {this.state.isShown || !this.state.animateFinished ?
          <NavPanelContainer isShown={this.state.isShown}>
            {window.innerWidth < 800 ?
              <BackButtonContainer onClick={() => { setState("mohammad.dev.nav.isShown", false, "volatile") }}>
                <BackButtonImg src={backsvg} />
                Back
              </BackButtonContainer>
              : null}
            {navItems.filter(a => a.isActive).map((navItem, index) =>
              <Link onClick={() => {
                setState("mohammad.dev.nav.isShown", false, "volatile")
              }} key={index} to={navItem.to}>
                <NavItem index={index}>
                  {navItem.title}
                </NavItem>
              </Link>
            )}
          </NavPanelContainer>
          : null
        }
      </>
    );
  }
}

const BackButtonImg = styled.img`
  height: 18px;
  width: 9px;
  margin-right: 10px;
`

const BackButtonContainer = styled.div`
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 300;
  color: #999999;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding-top: 15px;
  padding-left: 11px;
  padding-bottom: 15px;

  margin-bottom: 5px;
  cursor: pointer;
`

const linkSlideInAnimation = keyframes`
  from { margin-left: 100%; opacity: 0; }
  to { margin-left: 0px; opacity: 1; }
`

const NavItem = styled.div`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 300;
  color: #FFFFFF;
  text-decoration: none;

  transition: all 300ms ease-in-out;

  animation: ${(props: { index: number }) => props.index * 150}ms ${linkSlideInAnimation};

  :hover {
    background-color: #FFFFFF1A;
  }

  background-color: transparent;
  padding-top: 15px;
  padding-left: 30px;
  padding-bottom: 15px;
  cursor: pointer;
`

const slideInAnimation = keyframes`
  from { right: -100%; }
  to { right: 0px; }
`
const slideOutAnimation = keyframes`
  from { right: 0px; }
  to { right: -100%; }
`

const DarkenBG = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0px;
  left: 0px;
  pointer-events: ${(props: { isShown: boolean }) => props.isShown ? "unset" : "none"};
  background-color: ${(props: { isShown: boolean }) => props.isShown ? "#00000077" : "#00000000"};
  z-index: 15;
  transition: all 300ms ease-in-out;
`

const NavPanelContainer = styled.div`
  padding-top: 15px;
  a {
    text-decoration: none !important;
  }
  position: fixed;
  top: 0px;
  width: ${window.innerWidth >= 800 ? "400px" : "100%"};
  right: 0px;
  height: 100vh;
  animation: 300ms ${(props: { isShown: boolean }) => props.isShown ? slideInAnimation : slideOutAnimation};
  background-color: #000;
  z-index: 16;
`