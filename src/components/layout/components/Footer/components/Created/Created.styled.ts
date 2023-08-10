import { Size } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";


export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`


export const IconsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 5px;
    border-top: 1px solid #FFFFFF;
`

export const Image = styled.img`
    display: none;
    
    @media ${device.sm} {
        display: block;
        ${Size({w: '35px', h: '55px'})};
    }
`

export const IconLink = styled.a`
    display: block;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
`