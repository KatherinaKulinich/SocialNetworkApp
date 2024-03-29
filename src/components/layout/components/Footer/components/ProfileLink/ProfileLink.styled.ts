import { styled } from "styled-components";
import { device } from "@styles/Breakpoints";
import { Font } from '@styles/mixins';
import { theme } from "@styles/Theme";



export const ProfileCard = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;

    @media ${device.xl} {
        gap: 8px;
    }

    &:hover p {
        color: ${theme.colors.lightRose};
    }
`

export const ProfileCardText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const ProfileCardTitle = styled.p`
    ${Font({size: '10px', line: '13px', color: '#FFFFFF'})};
    text-transform: uppercase;

    @media ${device.xl} {
        font-size: 14px;
        line-height: 19px;
    }
`