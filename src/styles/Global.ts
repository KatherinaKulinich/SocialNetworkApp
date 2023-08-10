import styled, { createGlobalStyle, css } from 'styled-components'
import fontsCss from './fonts.module.css'
import { device } from './Breakpoints'


export const GlobalStyles = createGlobalStyle`
    ${fontsCss}

    * {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        height:100%;
        text-rendering: optimizeSpeed;
        font-family: ${({ theme }) => theme.fonts.poppins}, sans-serif;
        color: ${({ theme }) => theme.colors.textColor};
        background: #FFFFFF;

        /* @media ${device.md} {
            background: linear-gradient(90deg, #8d8d8d 25%, #fff 62%);
        }; */

       
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    figure,
    blockquote,
    dl,
    dd {
        padding: 0;
        margin: 0;
    }
    button {
        border: none;
        cursor: pointer;
    }
    ul[role="list"],
    ol[role="list"] {
        list-style: none;
    }
    li {
        list-style-type: none;
    }
    html:focus-within {
        scroll-behavior: smooth;
    }
   
    input,
    button,
    textarea,
    select {
    font: inherit;
    }
    
`