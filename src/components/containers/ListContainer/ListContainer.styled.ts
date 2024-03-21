import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Column, FullSize } from "@styles/mixins";


export const List = styled.div`
    ${FullSize};
    ${Column};
    gap: 12px;
    

    @media ${device.sm} {
        gap: 16px;
    };
    @media ${device.xl} {
        gap: 20px;
    };
`
