import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeScreen, Error404Screen, PortfolioScreen, ContactScreen } from './Screens';
import { NavBar, NavPanel, Footer } from './Components';
import styled from 'styled-components';

function Router() {
  return (
    <BrowserRouter>
      <RootContainer>
        <NavBar />
        <NavPanel />
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/portfolio" exact component={PortfolioScreen} />
          <Route path="/contact" exact component={ContactScreen} />
          <Route component={Error404Screen} />
        </Switch>
        <Footer />
      </RootContainer>
    </BrowserRouter>
  );
}

export default Router;


const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  width: 100vw;
  justify-content: space-between;

  * {
    a {
      &:focus{
        outline: none;
        text-shadow: 0px 0px 5px rgba(255,255,255,0.95);
      }
    }
    button {
      &:focus{
        outline: none;
        box-shadow: 0px 0px 5px rgba(255,255,255,0.95);
      }
    }
  }
`