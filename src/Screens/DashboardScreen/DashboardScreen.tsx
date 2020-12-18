import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { getState, setState, subscribeToState } from 'litsy';
import { IAuthToken } from '../../Models/IAuthToken';
import { config } from '../../Config';

export class DashboardScreen extends React.Component {

  async componentDidMount() {
    let result:IAuthToken | string = await axios.get(`${config.AUTH_SERVER_ENDPOINT}/check?token=${getState("mohammad.dev.auth.authToken", "persist")}`)

    subscribeToState("mohammad.dev.auth.authToken", "DashboardScreen", () => {this.forceUpdate.bind(this)()}, "persist")

    if (typeof result === "string") {
      setState("mohammad.dev.auth.authToken", null, "persist")
    }
  }
    
  render() {
    return (
      <DashboardScreenContainer>
        
      </DashboardScreenContainer>
    );
  }
}

const DashboardScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
`