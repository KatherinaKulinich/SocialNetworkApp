import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, FullSize, Size } from "@styles/mixins";


export const Card = styled.div`
    padding: 20px;
    width: 300px;
    min-height: 450px;
    ${BoxShadow};
    ${Column};
    gap: 30px; 
`

export const CardImage = styled.img`
    object-fit: cover;
    ${Size({w: '260px'})};
`

export const Content = styled.div`
    ${FullSize};
    ${FlexCenter};
`