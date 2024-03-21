import styled from "styled-components";
import { BoxShadow, Column, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";


export const Card = styled.div`
    width: 100%;
    max-width: 700px;
    padding: 15px;
    border-radius: 7px;
    ${BoxShadow};
    ${Column};
    gap: 10px;
    background-color: ${theme.colors.lightGray};

    @media ${device.sm} {
        padding: 25px;
        border-radius: 12px;
        gap: 15px;
    };
    @media ${device.xl} {
        padding: 35px;
        border-radius: 15px;
    };
`

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`

export const CardUserName = styled.p`
    ${Font({size: '11px', weight: '600', line: '14px', color: theme.colors.regularDark})};
    cursor: pointer;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 17px;
    };
`

export const CardText = styled.p`
    ${Font({size: '9px', weight: '300', line: '12px', color: theme.colors.darkGray})};

    @media ${device.sm} {
        font-size: 11px;
        line-height: 15px;
    };
`

export const UserDataContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`

export const CardImage = styled.img`
    width: 150px;

    @media ${device.sm} {
        width: 300px;
    };
`