import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';


export const ModalContainer = styled(Dialog)`
    & .css-1t1j96h-MuiPaper-root-MuiDialog-paper,
    &.MuiDialog-container {
        padding: 14px;
        position:relative;
        border-radius: 8px;
        width: 100%;
        max-width: 600px;
        text-align: center;
        margin: 10px;

        @media ${device.sm} {
            padding: 30px;
        };
    }
`

export const ModalTitle = styled(DialogTitle)`
    text-transform: uppercase;
    color: ${theme.colors.regular};

    &.css-bdhsul-MuiTypography-root-MuiDialogTitle-root {
        font-size: 11px;
        line-height: 14px;
    
        @media ${device.sm} {
            font-size: 14px;
            line-height: 17px;
        };
    }
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


