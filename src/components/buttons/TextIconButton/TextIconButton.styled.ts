import { theme } from "@styles/Theme";
import { FlexCenter } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";

interface ButtonProps {
    color: string;
    textSize: string;
    fontWeight: number;
    isDisabled?: boolean;
}


export const Button = styled.button<ButtonProps>`
    padding: 4px 10px;
    font-size: ${props => props.textSize};
    font-weight: ${props => props.fontWeight};
    text-decoration: none;
    text-transform: uppercase;
    color: ${props => props.isDisabled ? theme.colors.mediumGray : props.color};
    ${FlexCenter}
    gap: 6px;
    background-color: rgba(235, 235, 235, .5);
    border-radius: 10px;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};

    &:hover {
        background-color: ${props => props.isDisabled ?  '' :'rgba(235, 235, 235, .6)'};
    }

    @media ${device.sm} {
        gap: 10px;
        padding: 5px 12px;
        font-size: ${props => props.textSize};
    };
`