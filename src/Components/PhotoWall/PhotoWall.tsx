import React from 'react';
import styled from 'styled-components';

const fakeData = [
  [
    { gridWidth: 5, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/25A797EE-2727-4DBF-ABC7-6B2C2BF1091A.JPG" },
    { gridWidth: 10, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/3EFA831E-AF78-404A-B99C-06E7C4D4BBC4.JPG" },
    { gridWidth: 5, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/FB21518C-D0F2-49E7-9937-F8286CF0EC96.JPG" }
  ],
  [
    { gridWidth: 3, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/E6B51AE4-4136-446E-85F0-D21134769F12.JPG" },
    { gridWidth: 4, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/DSC02991.jpg" },
    { gridWidth: 8, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/IMG_0631.JPG" },
    { gridWidth: 5, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/94FFD191-B4B5-4777-BFC3-EE8C9C41B8D1.JPG" }
  ],
  [
    { gridWidth: 2, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/IMG_0621.JPG" },
    { gridWidth: 16, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/DSC02286.JPG" },
    { gridWidth: 2, src: "https://modev.sfo2.digitaloceanspaces.com/photography/canvas/DSC02988.jpg" }
  ]
]

interface PhotoWallProps {
  isShown: boolean
}

export class PhotoWall extends React.Component<PhotoWallProps> {

  componentWillMount() {
    window.addEventListener("resize", this.listenToResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.listenToResize.bind(this))
  }

  listenToResize(e: Event) {
    this.forceUpdate();
  }

  render() {
    return (
      <PhotoWallContainterDiv>
        {
          fakeData.map((row, rowIndex) => {
            return (
              <ImageRow key={rowIndex}>
                {
                  row.map((item, itemIndex) => {
                    return (
                      <ImageItem key={itemIndex} show={this.props.isShown} indexDelay={rowIndex + itemIndex} gridWidth={item.gridWidth} src={item.src} />
                    )
                  })
                }
              </ImageRow>
            )
          })
        }
      </PhotoWallContainterDiv>
    )
  }
}

interface ImageItemProps {
  gridWidth: number
  src: string
  indexDelay: number
  show: boolean
}

const ImageItem = styled.div`
  position: relative;
  margin: 10px;
  width: ${(props: ImageItemProps) => (window.innerWidth - 40) / 20 * props.gridWidth}px;
  height: calc((100vh - 40px - 40px) / 3);
  
  pointer-events: ${(props: ImageItemProps) => props.show ? "unset" : "none"};
  
  opacity: 0.1;
  :hover {opacity: 0.9;}
  transition: opacity 300ms ease-in-out;

  ::after {
    content: "";
    background: url("${(props: ImageItemProps) => props.src}") center center no-repeat;
    background-size: cover;
    opacity: ${(props: ImageItemProps) => props.show ? 1 : 0};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
    transition: opacity 300ms ${(props: ImageItemProps) => props.indexDelay === 0 ? "" : `${props.indexDelay * 200}ms`} ease-in-out;
  }
`

const ImageRow = styled.div`
  display: flex;
  flex-direction: row;
`

const PhotoWallContainterDiv = styled.div`
  margin: 10px;
  opacity: 1.0;
`