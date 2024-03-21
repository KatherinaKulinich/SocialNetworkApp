import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { BoxShadow, Column, FlexCenter, FullSize, Size } from "@styles/mixins";


export const Card = styled.div`
    padding: 15px;
    width:100%;
    max-width: 300px;
    min-height: 400px;
    ${BoxShadow};
    ${Column};

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