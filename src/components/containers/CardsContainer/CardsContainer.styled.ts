import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";


export const Cards = styled.div`
    width: 100%;
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