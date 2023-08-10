import { FlexCenter } from "@styles/mixins";
import { styled } from "styled-components";

interface ButtonProps {
    color: string;
    textSize: number;
    fontWeight: number;
}


export const Button = styled.button<ButtonProps>`
    font-size: ${props => props.textSize} px;
    line-height: ${props => props.textSize + 3} px;
    font-weight: ${props => props.fontWeight};
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.color};
    ${FlexCenter}
    gap: 10px;
    background-color: transparent;
`