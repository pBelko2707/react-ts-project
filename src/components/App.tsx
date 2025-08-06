import React from 'react';
import { GlobalStyle } from '../styles/global';
import Main from './Main';
import styled from 'styled-components';
import { MOBILE } from '../styles/breakpoints';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Body>
        <Main />
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media screen and (max-width: ${MOBILE}px) {
  }
`;

export default App;
