import React from 'react'
import styled from 'styled-components';

export class Footer extends React.Component {
  render() {
    return (
      <FooterContainer>
        {/* Links */}
        <FooterSection>
          <FooterRow>
            <a href="https://github.com/hackrmomo">GitHub</a>
            <a href="https://www.linkedin.com/in/mohammadalahdal/">LinkedIn</a>
            <a href="https://www.instagram.com/hackrmomo/">Instagram</a>
            <a href="https://twitter.com/hackrmomo">Twitter</a>
          </FooterRow>
        </FooterSection>
        {/* Copyright */}
        <FooterSection>
          <CopyrightSection>
            &copy; Mohammad Al-Ahdal
          </CopyrightSection>
        </FooterSection>
      </FooterContainer>
    );
  }
}

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000000;
  padding: 10px;
  width: auto;
`

const FooterSection = styled.div`
  padding: 10px;
`

const CopyrightSection = styled.div`
  color: #666666;
  margin-top: 10px;
  `

const FooterRow = styled.div`
  display: flex;
  flex-direction: row;
  a{
    padding: 0px 15px;
    :first-child {
      padding-left: 0px;
    }
    :last-child {
      padding-right: 0px;
    }
    color: white;
    text-decoration: none;
    font-family: "Open Sans";
    font-weight: 300;
  }
`