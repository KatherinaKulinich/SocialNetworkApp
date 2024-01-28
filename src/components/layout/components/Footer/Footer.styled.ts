import styled from "styled-components";
import { theme } from '@styles/Theme'
import { Font } from '@styles/mixins';
import { device } from "@styles/Breakpoints";



export const FooterText = styled.p`
    ${Font({size: '8px', line: '10px', color: '#FFFFFF'})};
    text-transform: uppercase;
`

export const FooterSection = styled.footer`
    background-color: ${theme.colors.regularDark};
    width: 100%;
    position:fixed;
    right:0;
    bottom: 0;
    left:0;
    z-index:100;
    padding: 0 15px;
`

export const FooterContainer = styled.div`
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${device.sm} {
        font-size: 16px;
        line-height: 19px;
    };
`
export const SubContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 30px;
`