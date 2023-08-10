import { styled } from "styled-components"
import {  NavLink } from "react-router-dom"
import { theme } from "@styles/Theme"
import { Font } from "@styles/mixins"


export const NavContainer = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 30px;
`


export const Link = styled(NavLink)`
    ${Font({size: '16px', line: '20px', color: theme.colors.white})};
    text-transform: uppercase;
    text-decoration:none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    &.active {
       color: ${theme.colors.regularDark};
       
       & svg path {
            color: ${theme.colors.regularDark};      
        }
    }
    &:hover {
       color: ${theme.colors.regular};

        & svg path {
            color: ${theme.colors.regular};
        }
    }



    &:first-child {
        padding-bottom: 20px;
        border-bottom: 1px solid #bcbcbc;
    }

    &:last-child {
        padding-top: 20px;
        border-top: 1px solid #bcbcbc;
    }
`