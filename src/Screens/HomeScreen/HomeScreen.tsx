import React from 'react';
import styled from 'styled-components'
import Lottie from 'react-lottie';
import momoMain from '../../Assets/data.json';
import scrollDown from '../../Assets/scroll-down-animation.json';
import { PhotoWall, InfoCard } from '../../Components'

interface HomeScreenProps {

}

interface HomeScreenState {
  showRemainingElements: boolean
  showScrollIndicator?: boolean

  screenWidth: number
  screenHeight: number
}

export class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {

  public readonly state: HomeScreenState = {
    showRemainingElements: false,
    showScrollIndicator: undefined,

    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  }

  listenForScroll(event: Event) {
    this.setState({ showScrollIndicator: false, showRemainingElements: true })
  }

  listenForResize(event: Event) {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    })
  }


  componentDidMount() {
    window.addEventListener('scroll', this.listenForScroll.bind(this))
    window.addEventListener('resize', this.listenForResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenForScroll.bind(this));
    window.removeEventListener('resize', this.listenForResize.bind(this))
  }

  render() {
    return (
      <HomeScreenContainerDiv>
        <LottieContainerDiv>
          <Lottie
            options={{
              loop: false,
              autoplay: true,
              animationData: momoMain,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              }
            }}
            height={window.innerWidth > 500 ? 500 : window.innerWidth}
            width={window.innerWidth > 500 ? 500 : window.innerWidth}
            isStopped={false}
            isPaused={false}
            eventListeners={[
              {
                eventName: 'complete',
                callback: () => {
                  if (this.state.showScrollIndicator === undefined) {
                    this.setState({ showRemainingElements: true, showScrollIndicator: true })
                  }
                }
              }
            ]}
          />
        </LottieContainerDiv>
        <ScrollIndicatorContainterDiv isShown={this.state.showScrollIndicator === true}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: scrollDown,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            width={window.innerWidth > 70 ? 70 : window.innerWidth}
            isStopped={false}
            isPaused={false}
          />
        </ScrollIndicatorContainterDiv>
        <PhotoWallDiv>
          <PhotoWall isShown={this.state.showRemainingElements} />
        </PhotoWallDiv>

        <ContentDiv>
          <MomoImage />
          <InfoCard style={{
            width: this.state.screenWidth >= 1440 ? "50vw" : "auto",
            padding: this.state.screenWidth >= 1440 ? "0.5in" : "0.2in",
            margin: this.state.screenWidth >= 1440 ? "0.5in" : "0px",
            disableDecor: this.state.screenWidth >= 1440 ? false : true
          }}>
            {
              `
# Hey! My name is Mohammad Al-Ahdal.

I'm a software developer located in [Edmonton, AB, Canada](https://www.google.com/maps/place/Edmonton,+AB). I'm a largely self-taught software developer who started coding at the age of 13. I studied Electrical Engineering at the [University of Alberta](https://uab.ca) until my fourth year in the program where I decided to start on my software development journey in a professional manner.

I've been interested in technology for as long as I can remember. As a kid I was addicted to the computer; I learned everything from basic networking commands to full Windows customization tools and how to code RainMeter skins. I was further thrown into the world of computing with videogames. I started coding actual applications in grade 8 where I started with a very rudimentary grasp of Visual Basic. I then transitioned into making websites using HTML, CSS, and JavaScript. In grade 10, I started working with Java, C++, and LabView for the [FIRST Robotics Competition](https://www.firstinspires.org/robotics/frc). In grade 11, I got my first MacBook Pro and I started learning iOS development as well as meddling with Open CV.

Throughout my university career I completed 2 internships for a total of 18 months of experience in the software development world. My first internship was at [DevFacto](https://devfacto.com/) as a __Software Consultant Intern__ for __6 months__ whilst my second internship was at [Intuit](https://intuit.com) as a __Software Development Co-op__ for __12 months__.

I currently work at [DevFacto](https://devfacto.com) as a __Software Consultant__ where I work on a multitude of different projects ranging from __Kubernetes Enabled Web-Apps__ to __Native iOS Apps__ to legacy __.NET Framework Desktop Apps__.

I primarily identify as a __Full-Stack Developer__ however I am most experienced in (and prefer) __Front-End Development__. I specialize in __Code Infrastructure__, __Mobile App Development__, __Web Development__, and __Desktop Applications__. If you would like to know more or if you would like to get in touch, please don't hesitate to [contact](/contact) me.
              `
            }
          </InfoCard>
        </ContentDiv>
      </HomeScreenContainerDiv>
    )
  }
}

const ContentDiv = styled.div`
  position: relative;
  margin-top: 100vh;
  display: flex;
  flex-direction: row-reverse;
  @media screen and (max-width: 1440px) {
    display: flexbox;
  }
  justify-content: center;
  align-items: center;
  z-index: 5;
`

const MomoImage = styled.div`
  position: relative;
  height: 550px;
  width: 350px;
  margin: 0.5in 0in;
  @media screen and (max-width: 1440px) {
    display: none;
  }
  ::after {
    box-shadow: 0px 0px 20px 0px #000000FF;
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: url("https://modev.sfo2.digitaloceanspaces.com/website-content/DSC09020-2.jpg") center 0%;
    background-size: cover;
    z-index: -1;
  }
`

const HomeScreenContainerDiv = styled.div`
  z-index: 1;
`
const LottieContainerDiv = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 5;
  
  `
const ScrollIndicatorContainterDiv = styled.div`
  opacity: ${(props: { isShown: boolean }) => props.isShown ? 1 : 0};
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 300ms ease-in-out;
  pointer-events: none;
  z-index: 5;
`
const PhotoWallDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`