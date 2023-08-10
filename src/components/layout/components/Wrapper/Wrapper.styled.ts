import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";

export const Wrap = styled.div`
    height: inherit;
    max-width: 100%;
    width:100%;

    @media ${device.xl} {
        margin: 0 80px;
    };
    @media ${device.xl} {
        margin: 0 auto;
        width: 1440px; 
    };
`