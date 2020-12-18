import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export class Error404Screen extends React.Component {
  render() {
    return (
      <Error404ScreenContainer>
        <h3>{`<Error 404>`}</h3>
        <code>
          <span>{"{"}</span>
          <span>{`\t`}<span style={{ color: "#33cc99" }}>"type"</span>: <span style={{ color: "#FF5555" }}>"ERROR"</span>,</span>
          <span>{`\t`}<span style={{ color: "#33cc99" }}>"message"</span>: <span style={{ color: "#FF5555" }}>"Error 404 - Page not found"</span>,</span>
          <span>{`\t`}<span style={{ color: "#33cc99" }}>"description"</span>: <span style={{ color: "#FF5555" }}>"Click here to head back <Link to="/">Home</Link>"</span></span>

          <span>{"}"}</span>
        </code>
        <h3>{`</Error 404>`}</h3>
      </Error404ScreenContainer>
    );
  }
}

const Error404ScreenContainer = styled.div`
  h3 {
    color: #FF5555;
  }
  *{
    font-family: "Open Sans"
  }
  code {
    display: flex;
    font-family: unset;
    flex-direction: column;
    > span {
      white-space: pre-wrap;
    }
    a{
      color: #3399cc;
      text-decoration: none;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`