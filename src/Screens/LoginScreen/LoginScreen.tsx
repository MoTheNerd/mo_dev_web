import React from 'react'
import styled from 'styled-components';

export class LoginScreen extends React.Component {
  render() {
    return (
      <LoginScreenContainer>
        <LoginCard>
          <LoginButton disabled={false}>
            Login
          </LoginButton>
          <LoginDescription>
            Clicking login will send a notification to your authenticator app. Hit approve to authenticate the session.
          </LoginDescription>
        </LoginCard>
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
`

const LoginDescription = styled.p`
  font-family: "Open Sans";
  font-weight: 300;
  color: #595959;
`

const LoginButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px;
  border-radius: 0px;
  color: #FFFFFF;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 20px;
  background-color: #101010;

  &:active {
    background-color: #070707;
  }
`