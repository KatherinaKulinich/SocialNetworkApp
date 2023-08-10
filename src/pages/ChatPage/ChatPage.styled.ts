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
    
    @media ${device.lg} {
        width: 100%;
        grid-column: 1/2;
        padding: 15px;
        background-color: ${theme.colors.lightGray};
        max-height: calc(100vh - 160px);
        min-height: calc(100vh - 160px);
        overflow-y: auto;
        position: absolute;
        top: 0;
        left:0;
    };
`

export const MainChat = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    max-height: calc(100vh - 125px);
    overflow-y: auto;
    grid-column: 2/3;


    @media ${device.sm} {       
        max-height: calc(100vh - 125px);
    };

    @media ${device.md}  {
        max-height: calc(100vh - 160px);
    }
    @media ${device.lg}  {
        grid-column: 2/3;
    }
`
