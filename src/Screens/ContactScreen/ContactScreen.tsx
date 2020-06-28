import React from 'react'
import styled from 'styled-components';

export class ContactScreen extends React.Component {
  render() {
    return (
      <ContactCardContainer>
        <ContactCard>
          <StyledInput type="text" placeholder="Full Name"></StyledInput>
          <StyledInput type="email" placeholder="Email"></StyledInput>
          <StyledTextArea rows={7} placeholder="Enter a message..." />
          <StyledSubmitButton onClick={() => {
            console.log("do something")
          }}>Submit</StyledSubmitButton>
        </ContactCard>
      </ContactCardContainer>
    );
  }
}

const ContactCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 100px;
`

const ContactCard = styled.div`
  background-color: #000000;
  box-shadow: 0px 0px 20px 0px #000000FF;
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 700px;
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

const StyledTextArea = styled.textarea`
  background: none;
  border: none;
  resize: none;
  font-size: 20px;
  padding: 20px;
  color: white;
  font-family: "Open Sans";
  :focus {
    outline: none;
    background-color: #121212;
  }
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 300;
  ::placeholder {
    color: #cdcdcd
  }
`

const StyledSubmitButton = styled.button`
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
`