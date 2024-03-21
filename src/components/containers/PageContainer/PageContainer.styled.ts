import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Column, FullSize } from "@styles/mixins";


export const Page = styled.div`
    padding: 20px 10px;
    ${FullSize};
    ${Column};
    gap: 12px;


    @media ${device.sm} {
        padding: 20px 15px;
        gap: 15px;
    };
    @media ${device.xl} {
        padding: 25px 20px;
        gap: 20px;
    };
`