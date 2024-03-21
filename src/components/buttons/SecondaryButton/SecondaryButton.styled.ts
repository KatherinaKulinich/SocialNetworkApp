import styled from "styled-components";
import { device } from "@styles/Breakpoints";
import { FlexCenter } from "@styles/mixins";


export const Button = styled.button<{color:string}>`
    background-color: transparent;
    border: 2px solid ${props => props.color};
    color: ${props => props.color};
    font-size: 13px;
    line-height: 17px;
    text-transform: uppercase;
    padding: 5px 16px;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
    ${FlexCenter}
    gap: 6px;


    &:hover {
        background-color: rgba(236, 235, 235, .2);
    }

    @media ${device.sm} {
        padding: 6px 20px;
        border-radius: 20px;
        gap: 9px;
        font-size: 16px;
        line-height: 19px;
    };
    @media ${device.xl} {
       padding: 8px 25px;
        border-radius: 25px;
    };
`