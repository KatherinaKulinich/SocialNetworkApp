import styled from "styled-components";
import { device } from "@styles/Breakpoints";
import { FlexCenter } from "@styles/mixins";



export const Button = styled.button<{color:string}>`
    background-color: transparent;
    border: 1px solid ${props => props.color};
    color: ${props => props.color};
    text-transform: uppercase;
    padding: 4px 18px;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
    ${FlexCenter};
    gap: 6px;
    font-size: 10px;
    line-height: 14px;


    &:hover {
        background-color: rgba(236, 235, 235, .2);
    }

    @media ${device.sm} {
        padding: 6px 26px;
        border-radius: 20px;
        border-width: 2px;
        gap: 9px;
        font-size: 12px;
        line-height: 17px;
    };
`