import { styled } from "styled-components"
import { theme } from "@styles/Theme"
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";

export const Container = styled.div`
    ${FullSize};
    position: relative;

    @media ${device.lg} {
        display: grid;
        grid-template-columns: 300px 1fr;
        grid-template-rows: auto;
    };
`


export const ChatsPreview = styled.div`
    z-index: 20;

    @media ${device.lg} {
        width: 100%;
        grid-column: 1/2;
        padding: 10px;
        background-color: ${theme.colors.lightGray};
        /* max-height: calc(100vh - 129px);
        min-height: calc(100vh - 129px); */
        overflow-y: auto;
        position: absolute;
        /* position: absolute; */
        top: 0;
        left:0;
        bottom:0;
    };
`

export const MainChat = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position:absolute;
    /* position:relative; */
    height:calc(100% - 165px);

    @media ${device.sm} {  
        height:calc(100% - 155px);     
    };

    @media ${device.lg}  {
        grid-column: 2/3;
    }
`
