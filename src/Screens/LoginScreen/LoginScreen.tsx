import React from 'react'
import styled from 'styled-components';
import io from 'socket.io-client';
import { setState, getState, subscribeToState } from 'litsy';
import QRCode from 'qrcode.react'
import { Redirect } from 'react-router-dom';
import { config } from '../../Config';

export class LoginScreen extends React.Component <{}, {
  qrCode: string | undefined
}> {
  socket!: SocketIOClient.Socket;
  state = {
    qrCode: undefined
  }

  componentDidMount() {
    this.socket = io(config.AUTH_SOCKET_ENDPOINT)
    this.socket.open();

    subscribeToState("mohammad.dev.auth.authToken", "LoginScreen", () => {this.forceUpdate.bind(this)()}, "persist")

    this.socket.on("authenticateSession", (token: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(token);
      }
      setState("mohammad.dev.auth.authToken", token, "persist")
    })

    this.socket.on("connect", () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("successfully conected to auth socket")
        console.log("socketId: ", this.socket.id)
      }
      this.setState({qrCode: this.socket.id})
    })

    
  }
  render() {
    return (
      <LoginScreenContainer>
          {
            getState("mohammad.dev.auth.authToken", "persist") === null ?
              this.state.qrCode !== undefined ? 
                <LoginCard>
                  <QRCode value={`modev:authenticateClient?code=${this.state.qrCode!}`} /> 
                  <LoginDescription>
                    Scan the above QR Code with the authenticator app to approve this session and login.
                  </LoginDescription>
                </LoginCard>
                : null
              : <Redirect to="/dashboard" />

          }
          
      </LoginScreenContainer>
    );
  }
}

const LoginScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
`

const LoginCard = styled.div`
  background-color: #000000;
  box-shadow: 0px 0px 20px 0px #000000FF;
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 500px;
  align-items: center;
`

const LoginDescription = styled.p`
  font-family: "Open Sans";
  font-weight: 300;
  color: #595959;
`