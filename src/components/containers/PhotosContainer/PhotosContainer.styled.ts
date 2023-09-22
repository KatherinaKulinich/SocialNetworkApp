import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";




export const Photos = styled.div`
    width:100%;
    /* ${FullSize}; */
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    /* justify-content: center; */
    justify-content: space-evenly;

    @media ${device.sm} {
        gap: 20px;
    };
    @media ${device.xl} {
        gap: 40px;
    };
`