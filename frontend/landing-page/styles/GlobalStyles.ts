import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    background-color: #ffffff;
    color: #000000;
    letter-spacing: 2px;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Alata', sans-serif;
    font-weight: normal;
    color: #000;
  }

  h1 {
    font-size: 45px;
  }

  h2 {
    font-size: 20px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    transition: background-color 0.3s ease;
  }
`

export default GlobalStyles 