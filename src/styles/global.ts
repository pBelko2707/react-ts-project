import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background: rgb(244, 245, 249);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: PT Sans, sans-serif;
  }
`;
