import { FlexCenter } from "@styles/mixins";
import styled from "styled-components";

export const Button = styled.button<{color:string}>`
    background-color: transparent;
    border: 2px solid ${props => props.color};
    color: ${props => props.color};
    text-transform: uppercase;
    padding: 8px 25px;
    border-radius: 25px;
    outline: none;
    cursor: pointer;
    ${FlexCenter}
    gap: 9px;

    &:hover {
        background-color: rgba(236, 235, 235, .2);
    }
`