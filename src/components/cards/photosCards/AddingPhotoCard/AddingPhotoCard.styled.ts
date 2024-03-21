import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, FullSize, Size } from "@styles/mixins";
import { theme } from "@styles/Theme"
import { device } from "@styles/Breakpoints";


export const Card = styled.div`
    padding: 15px;
    width:100%;
    max-width: 300px;
    min-height: 400px;
    ${BoxShadow};
    ${Column};

    @media ${device.sm} {
        /* padding: 20px; */
    };
    @media ${device.lg} {
        min-height: 450px;
    };
`

export const CardImage = styled.img`
    object-fit: cover;
    ${Size({w: '260px'})};
`

export const Content = styled.div`
    ${FullSize};
    ${FlexCenter};
`