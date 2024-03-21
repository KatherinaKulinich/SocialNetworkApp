import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { FlexCenter } from "@styles/mixins";


export const TitleContainer = styled.div`
    align-self: stretch;
    ${FlexCenter};
    gap: 7px;
    z-index: 5;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
`


export const Image = styled.img`
    width: 100px;

    @media ${device.sm} {
        width: 140px;
    };
`


export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 3px;
`
