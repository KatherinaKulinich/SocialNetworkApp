import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, Font, Size } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";




export const Card = styled.div`
    padding: 18px;
    width: 100%;
    max-width: 220px;
    border-radius: 10px;
    background-color: ${theme.colors.lightGray};
    ${Column};
    justify-content: space-between;
    align-items:center;
    gap: 20px;
    ${BoxShadow};
    height:initial;
    cursor: pointer;

    @media ${device.sm} {
        max-width: none;
        width: 220px;
        padding: 22px;
        border-radius: 15px;
    };
    @media ${device.xl} {
        width: 250px;
    };
`


export const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    gap: 7px;
`


export const Name = styled.h3`
    ${Font({size: '12px', line: '15px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const PersonalInfo = styled.div`
    ${Column};
    gap: 3px;
    text-align: center;

    @media ${device.sm} {
        gap: 6px;
    };
`

export const Text = styled.p`
    ${Font({size: '9px', line: '14px', color: theme.colors.mediumGray})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 11px;
        line-height: 15px;
    };
`

