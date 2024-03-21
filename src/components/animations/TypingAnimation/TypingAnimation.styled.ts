import styled, { keyframes }from 'styled-components';
import { device } from "@styles/Breakpoints";
import { theme } from '@styles/Theme';
import { FlexCenter, BoxShadow } from '@styles/mixins';

export const TypingContainer = styled.div`
    width: 60px;
    height: 25px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 10px 10px 10px 0;
    ${FlexCenter};
    ${BoxShadow};
    gap: 4px;
    position: absolute;
    bottom: 15px;
    left: 25px;

    @media ${device.sm} {
        width: 80px;
        height: 30px;
        gap: 7px;
        left: 60px;
    }
`
const dotsLoadingAnimation = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        opacity: 0;
    }
`

export const TypingDot = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${theme.colors.regularDark};
    opacity: 0;
    animation: ${dotsLoadingAnimation} 2s infinite;

    &:nth-child(1) {
        animation-delay: 0s;
    }

    &:nth-child(2) {
        animation-delay: 0.2s;
    }

    &:nth-child(3) {
        animation-delay: 0.4s;
    }

    @media ${device.sm} {
        width: 10px;
        height: 10px;
    }
`


