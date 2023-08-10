import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Column, FullSize } from "@styles/mixins";


export const Page = styled.div`
    padding: 20px 10px;
    ${FullSize};
    ${Column};
    gap: 15px;


    @media ${device.sm} {
        padding: 30px 20px;
        gap: 20px;
    };
    @media ${device.xl} {
        padding: 40px 30px;
        gap: 25px;
    };
`