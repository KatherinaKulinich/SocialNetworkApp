import { styled } from "styled-components"
import {  NavLink } from "react-router-dom"
import { theme } from "@styles/Theme"
import { Font } from "@styles/mixins"
import { device } from "@styles/Breakpoints"


export const NavContainer = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
`

export const Link = styled(NavLink)`
    ${Font({size: '11px', line: '16px', color: theme.colors.white})};
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
        padding-bottom: 10px;
        border-bottom: 1px solid #bcbcbc;

        @media ${device.sm} {
            padding-bottom: 14px;
        };
    }

    &:last-child {
        padding-top: 10px;
        border-top: 1px solid #bcbcbc;

        @media ${device.sm} {
            padding-bottom: 14px;
        };
    }
`