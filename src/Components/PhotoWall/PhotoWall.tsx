import React from 'react';
import styled from 'styled-components'
import { config } from '../../Config'
import axios from 'axios'
import {IPhotographyItem} from '../../Models/IPhotographyItem'
import { getState, setState, subscribeToState } from 'litsy';

interface IHomePagePhotoWallItem {
  gridWidth: number,
  image: IPhotographyItem
}

interface PhotoWallProps {
  isShown: boolean
}

export class PhotoWall extends React.Component<PhotoWallProps> {

  photoWallItems: Array<Array<IHomePagePhotoWallItem>> | null = null

  private generateWidthsForRow(maxWidth: number = 20) : Array<number> {
    var returnArray: Array<number> = []
    while (maxWidth > 0) {
      var entityWidth = Math.ceil(Math.random()*maxWidth*0.75)
      returnArray.push(maxWidth - entityWidth <= 0 ? maxWidth : entityWidth)
      maxWidth -= entityWidth
    }
    return returnArray
  }

  async componentDidMount() {
    window.addEventListener("resize", this.listenToResize.bind(this))
    let serverResponse = await axios.get(`${config.PHOTOGRAPHY_SERVER_ENDPOINT}/posts`);
    subscribeToState("photography_items", "PhotoWall", () => { this.forceUpdate.bind(this)() }, "volatile")
    // this requires us to have a minimum of 60 photos in the database to ensure that the site never crashes due to a javascript error
    let unTransformedResponseData: Array<IPhotographyItem> = serverResponse.data
    let generatedWidthArray: Array<Array<number>> = []
    for (let i = 0; i < 3; i++) {
      generatedWidthArray[i] = this.generateWidthsForRow()
    }
    setState("photography_items", generatedWidthArray.map(a => a.map(c => ({gridWidth: c, image: unTransformedResponseData.pop()}))), "volatile");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.listenToResize.bind(this))
  }

  listenToResize(e: Event) {
    this.forceUpdate();
  }

  render() {
    this.photoWallItems = getState("photography_items", "volatile")
    console.log(this.photoWallItems)
    return (
      <PhotoWallContainterDiv>
        {
          this.photoWallItems && this.photoWallItems.map ?
          this.photoWallItems.map((row, rowIndex) => {
            return (
              <ImageRow key={rowIndex}>
                {
                  row.map((item, itemIndex) => {
                    return (
                      <ImageItem key={itemIndex} show={this.props.isShown} indexDelay={rowIndex + itemIndex} gridWidth={item.gridWidth} src={item.image.imgUri} />
                    )
                  })
                }
              </ImageRow>
            )
          }) : <div></div>
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