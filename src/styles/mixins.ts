import styled, { css } from "styled-components";
import { theme } from './Theme'
import { device } from './Breakpoints'

interface StyledProps {
    [key:string]: string;
}



export const Font = ({size, weight, line, color}: StyledProps) => `
    font-size: ${size || '12px'};
    font-weight: ${weight || '400'};
    line-height: ${line || '16px'};
    color: ${color || theme.colors.textColor}
`



export const FlexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Column = css`
    display:flex;
    flex-direction: column;
    align-items: center;
`

export const FullSize = css`
    width: 100%;
    height: 100%;
`

export const BoxShadow = css`
    box-shadow: inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
`

export const AbsoluteCenter = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Size = ({w, h = w}:StyledProps) => `
    width: ${w};
    height: ${h};
`