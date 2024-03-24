import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import Dialog from '@mui/material/Dialog';

import { Modal } from "@mui/material";


export const ModalContainer = styled(Dialog)`
    /* padding: 14px;
    position:relative;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin: 10px;

    @media ${device.sm} {
        padding: 30px;
    } */
`



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


