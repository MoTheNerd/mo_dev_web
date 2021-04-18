import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { setState, getState, subscribeToState } from 'litsy';
import { config } from '../../Config';
import { IValidatedAuthResult } from '../../Models/IValidatedAuthResult';

export const LoginScreen = () => {

  const [authToken, setAuthToken] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithExistingToken = async (token: string): Promise<void> => {
    const result = (await axios.get<IValidatedAuthResult>(`${config.AUTH_SERVER_ENDPOINT}/validate/${token}`)).data
    if (result.isAuthenticated) 
    {
      window.location.assign("/dashboard")
    }
    setIsLoading(false)
  }

  useEffect(() => {
    subscribeToState("mohammad.dev.auth.authToken", "LoginScreen", () => {
      setAuthToken(getState("mohammad.dev.auth.authToken", "persist"))
    }, "persist")

    setAuthToken(getState("mohammad.dev.auth.authToken", "persist"))

    if (authToken && authToken.trim() !== "") 
    {
      // test token 
      loginWithExistingToken(authToken)
    }
  }, [authToken])
  return (
    <LoginScreenContainer>
      {
        isLoading ?
          <></>
          :
          <LoginCard>
            <StyledInput onKeyDown={async (e) => {
              if (e.keyCode === 13) {
                setIsLoading(true)
                const result = (await axios.post<IValidatedAuthResult>(`${config.AUTH_SERVER_ENDPOINT}/login?password=${password}`)).data
                if (result.isAuthenticated) {
                  setState("mohammad.dev.auth.authToken", result.authToken.token, "persist")
                  window.location.assign("/dashboard")
                }
                setIsLoading(false)
              }
            }} onChange={(e) => {
              setPassword(e.target.value)
            }} type="password" placeholder="Password" />
            <LoginDescription>
              Type in your super secret password, Mohammad. <span role="img" aria-label="alien emoji">👾</span>
            </LoginDescription>
          </LoginCard>
      }
    </LoginScreenContainer>
  );
}

const LoginScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
`

const StyledInput = styled.input`
  background: none;
  border: none;
  border-radius: 0px;
  font-size: 20px;
  padding: 20px;
  font-family: "Open Sans";
  color: white;
  :focus {
    outline: none;
    background-color: #121212;
  }
  font-weight: 300;
  ::placeholder {
    color: #cdcdcd
  }
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