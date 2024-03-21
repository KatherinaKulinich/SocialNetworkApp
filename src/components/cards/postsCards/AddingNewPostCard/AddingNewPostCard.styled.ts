import { theme } from "@styles/Theme";
import { BoxShadow, Column, Font } from "@styles/mixins";
import { styled } from "styled-components";
import { Input } from 'antd';
import { device } from "@styles/Breakpoints";

const { TextArea } = Input;

export const CardImage = styled.img`
    width: 50px;
    height: 50px;

    @media ${device.xs} {
        width: 70px;
        height: 70px;
    };
    @media ${device.sm} {
        width: 150px;
        height: 150px;
    };
`

export const CreatingPostField = styled.div`
    width: 100%;    
    display: flex;
    align-items: center;
    gap: 10px;
`

export const TextField = styled(TextArea)`
    width: 100%;

    &:focus,
    &:active, 
    &:hover {
        outline:2px solid ${theme.colors.lightRose};
        border: none;
    }
`

export const Wrap= styled.div`
    /* align-self: center; */
    margin-left: auto;
    margin-right: auto;
`


