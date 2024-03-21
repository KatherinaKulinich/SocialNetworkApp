import { styled } from "styled-components";
import { FlexCenter, FullSize, Font } from "@styles/mixins";
import { device } from "@styles/Breakpoints";
import { theme } from "@styles/Theme";

export const MessageForm = styled.form`
    width: 100%;
    display:flex;
    justify-content: space-between;
    border: 0.5px solid #bebebe;
    border-radius: 3px;
    background-color: #FFF;
    position: sticky;
    right:0;
    bottom:0;
    left:0;
    z-index: 20;

    @media ${device.sm} {
        border-width: 1px;;
    };
`

export const MessageField = styled.div`
    ${FullSize};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 5px;

    @media ${device.sm} {
        padding: 10px 15px;
    };
`

export const IconButton = styled.div`
    padding: 5px;
    background-color: transparent;
    font-size:0;
    cursor: pointer;

    @media ${device.sm} {
        padding: 10px;
    };
`

export const MessageText = styled.input`
    width: 100%;
    border: none;
    outline: none;
    ${Font({size: '10px', line: '13px', color: theme.colors.darkGray})};

    &::placeholder {
        font-size: 9px;

        @media ${device.sm} {
            font-size: 12px;
        };
    }
`

export const SendButton = styled.button`
    width: 60px;
    ${FlexCenter};
    border-left: 1px solid #bebebe;
    padding: 6px;
    background-color: transparent;
    font-size:0;
    cursor: pointer;

    @media ${device.sm} {
        padding: 10px;
    };

    @media ${device.sm} {
        border-left: 2px solid #bebebe;
        width: 100px;
    };

    &:hover {
        background-color: #EEE;
    }

    &:disabled {
        background-color: ${theme.colors.lightGray};
        cursor: wait;
    }
`