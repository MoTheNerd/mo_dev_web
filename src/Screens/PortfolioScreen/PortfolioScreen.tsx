import React from 'react';
import styled from 'styled-components';
import { PortfolioItem } from '../../Components/PortfolioItem';
import {setState, subscribeToState, getState} from 'litsy';
import axios from 'axios';
import {config} from '../../Config'
import {IPortfolioItem} from '../../Models/IPortfolioItem'

export class PortfolioScreen extends React.Component {

  portfolioEntities: Array<IPortfolioItem> | null = null

  async componentDidMount () {
    let serverResponse = await axios.get(`${config.PORTFOLIO_SERVER_ENDPOINT}/posts`);
    subscribeToState("portfolio_items", "PortfolioScreen", () => {this.forceUpdate.bind(this)()}, "volatile")
    setState("portfolio_items", serverResponse.data, "volatile");
  }

  render() {
    this.portfolioEntities = getState("portfolio_items", "volatile");
    return (
      <PortfolioScreenContainer>
        { 
          this.portfolioEntities && this.portfolioEntities.map
          ? this.portfolioEntities.map(
            (data, index) => <PortfolioItem key={index} imgUrl={data.imgUri} direction={index % 2 === 0 ? "right" : "left"} markdown={data.markdown} />) 
          : <div></div>
        }
      </PortfolioScreenContainer>
    )
  }
}

const PortfolioScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: auto;
  margin-top: 70px;
  align-items: center;
`