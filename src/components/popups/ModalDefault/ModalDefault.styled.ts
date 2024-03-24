import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";



export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border-radius: 5px;
    padding:0;
    font-size: 0;
    cursor: pointer;


    &:active {
        background-color: #feebec;
    }

    &:hover {
        background-color: #fef6f7;
    }
`


