import { FlexCenter, FullSize } from "@styles/mixins";
import { styled } from "styled-components";

export const MessageForm = styled.form`
    width: 100%;
    display:flex;
    align-items: stretch;
    justify-content: space-between;
    border: 2px solid #bebebe;
    background-color: #FFF;
    position: sticky;
    right:0;
    bottom:0;
    left:0;
`

export const MessageField = styled.div`
    ${FullSize};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
`

export const IconButton = styled.button`
    padding: 10px;
    background-color: transparent;
    font-size:0;
`

export const MessageText = styled.input`
    width: 100%;
    border: none;
    outline: none;
`

export const SendButton = styled(IconButton)`
    width: 100px;
    ${FlexCenter};
    border-left: 2px solid #bebebe;
    /* border-right: 2px solid #bebebe; */

    &:hover {
        background-color: #EEE;
    }
`