import { styled } from "styled-components";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { theme } from "@styles/Theme";
import { Column, Font } from "@styles/mixins";
import { device } from "@styles/Breakpoints";


export const ModalContainer = styled(Dialog)`
    
    & .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
        padding: 14px;
        position:relative;
        border-radius: 8px;
        width: 100%;
        max-width: 600px;
        text-align: center;

        @media ${device.sm} {
            padding: 30px;
        };
    }
`

export const ModalTitle = styled(DialogTitle)`
    ${Font({size: '12px', line: '15px', color: theme.colors.regular})};
    text-transform: uppercase;
`

export const CloseButton = styled.button`
    position: absolute;
    top: 7px;
    right: 7px;
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


