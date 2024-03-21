import { Size } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";



export const Container = styled.div`
    /* display: flex;
    align-items: flex-start;
    gap: 40px; */
`


export const IconsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 3px;
    border-top: 0.5px solid #FFFFFF;
`


export const IconLink = styled.a`
    display: block;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
`

