import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { getState, setState, subscribeToState } from 'litsy';
import { IValidatedAuthResult } from '../../Models/IValidatedAuthResult';
import { config } from '../../Config';

export const DashboardScreen = () => {
  // TODO: make sure you log out on expired token
  return (
    <DashboardScreenContainer>
      <p>Welcome to your dashboard, Mohammad!</p>
      <p>This will eventually be populated with the following features:</p>
      <div>
        <ul>
          <li>Photo Upload (img, iso, aperture, focalLength, shutterSpeed, locationAndTime)</li>
          <li>Portfolio Upload (img, markdown editor)</li>
          <li>WorkExperience Upload (startTime, endTime[NULLABLE], description, bulletPoints)</li>
          <li>Skills adder (basic string array)</li>
          <li>ResumeGeneratorButton</li>
        </ul>
      </div>
      <p>Seems exciting! This is a lot of work indeed - in the meanwhile you can still Logout and mess around with the mo_dev_auth microservice by logging out and logging in!</p>
      <StyledLogoutButton onClick={() => {
        setState("mohammad.dev.auth.authToken", null, "persist")
        window.location.assign("/login")
      }}>Log Out</StyledLogoutButton>
    </DashboardScreenContainer>
  );
}

const DashboardScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  flex-direction: column;
`

const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px;
  border-radius: 0px;
  color: #FFFFFF;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 20px;
  background-color: #000000;
`