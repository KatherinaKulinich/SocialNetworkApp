import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FullSize } from "@styles/mixins";

export const Cards = styled.div`
    width: 100%;
    /* ${FullSize}; */
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 20px;

    @media ${device.sm} {
        gap: 20px;
    };
    @media ${device.xl} {
        gap: 30px;
    };
`