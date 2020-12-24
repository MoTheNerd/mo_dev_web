import React from 'react'
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

interface PortfolioItemProps {
  imgUrl: string
  direction: "left" | "right"
  markdown: string
}

export class PortfolioItem extends React.Component<PortfolioItemProps> {
  render() {
    return (
      <PortfolioItemContainer {...this.props}>
        <PortfolioItemImage {...this.props} />
        <PortfolioItemMarkdownContainer {...this.props}>
          <ReactMarkdown
            source={`${this.props.markdown.replace(/\\n/g, "\n")}`}
          />
        </PortfolioItemMarkdownContainer>
      </PortfolioItemContainer>
    );
  }
}

const PortfolioItemContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 0.4in;
  margin-bottom: 0.4in;
  width: 100%;
  flex-direction: ${
  (props: PortfolioItemProps) =>
    window.innerWidth <= 700 ? 
    "column" :
      props.direction === "right" ?
        "row" :
        "row-reverse"
  };
`

const PortfolioItemImage = styled.div`
  display: flex;
  flex: 7;
  height: 500px;
  width: auto;
  margin-left: 30px;
  margin-right: 30px;
  background: url("${(props: PortfolioItemProps) => `${props.imgUrl}`}") center center;
  background-size: cover;
  `

const PortfolioItemMarkdownContainer = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  text-align: ${(props: PortfolioItemProps) => props.direction === "right" ? "left" : "right"};
  max-width: 500px;
  margin-left: 30px;
  margin-right: 30px;
  
  * {
    font-family: "Open Sans";
    font-weight: 300;
  }

  a{
    color: #3399cc;
    font-weight: 300;
    text-decoration: none;
  }
`