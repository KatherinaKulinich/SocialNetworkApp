import { FlexCenter } from "@styles/mixins";
import { styled } from "styled-components";

interface ButtonProps {
    color: string;
    textSize: string;
    fontWeight: number;
}


export const Button = styled.button<ButtonProps>`
    padding: 5px 10px;
    font-size: ${props => props.textSize};
    /* line-height: ${props => props.textSize + 3} px; */
    font-weight: ${props => props.fontWeight};
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.color};
    ${FlexCenter}
    gap: 10px;
    background-color: rgba(235, 235, 235, .4);
    border-radius: 10px;

    &:hover {
        background-color: rgba(235, 235, 235, .6);
    }
`