import { Size } from "@styles/mixins";
import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Font } from '@styles/mixins';
import { theme } from "@styles/Theme";


export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 40px;
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
        ${Size({w: '70px', h: '60px'})};
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

export const ProfileCard = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;

    &:hover p {
        color: ${theme.colors.lightRose};
    }
`

export const ProfileCardText = styled(Content)`
    align-items: flex-start;
    gap: 4px;
`

export const ProfileCardTitle = styled.p`
    ${Font({size: '15px', line: '19px', color: '#FFFFFF'})};
    text-transform: uppercase;
`