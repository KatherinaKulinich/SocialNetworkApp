import { AbsoluteCenter, FlexCenter } from "@styles/mixins";
import styled, { keyframes } from "styled-components";





const reactionsAnimation = (x:number, y:number) => keyframes`
    0% {
        opacity: 0;
        transform: translate(0px, 0px) scale(0.8);
    }
    20% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translate(${x}px, ${y}px) scale(2.5);
    }
`



export const AnimationContainer = styled.div`
    width: 70px;
    height: 70px;
    position: absolute;
    ${AbsoluteCenter};
    z-index: -1;
`

export const AnimationItem = styled.div<{$x:number, $y:number}>`
    ${AbsoluteCenter};
    opacity: 0;
    position: absolute;
    animation-name: ${props => reactionsAnimation(props.$x, props.$y)};
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    &:nth-child(1) {
        font-size: 25px;  
        animation-delay: 0s;
        animation-duration: 3s;
    }
    &:nth-child(2) {
        font-size: 45px;
        animation-delay: 0s;
        animation-duration: 4s;
    }
    &:nth-child(3) {
        font-size: 15px;
        animation-delay: 0s;
        animation-duration: 2s;
    }
    &:nth-child(4) {
        font-size: 40px;
        animation-delay: 1s;
        animation-duration: 2s;
    }
    &:nth-child(5) {
        font-size: 25px;
        animation-delay: 0s;
        animation-duration: 2s;
    }
    &:nth-child(6) {
        font-size: 10px;
        animation-delay: 1s;
        animation-duration: 1s;
    }
    &:nth-child(7) {
        font-size: 25px;
        animation-delay: 0s;
        animation-duration: 3s;
    }
    &:nth-child(8) {
        font-size: 18px;
        animation-delay: 0s;
        animation-duration: 4s;
    }
    &:nth-child(9) {
        font-size: 10px;
        animation-delay: 1s;
        animation-duration: 3s;
    }
    &:nth-child(10) {
        font-size: 20px;
        animation-delay: 2s;
        animation-duration: 3s;
    }
`

