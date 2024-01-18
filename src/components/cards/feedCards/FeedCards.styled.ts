import styled from "styled-components";
import { BoxShadow, Column, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";


export const Card = styled.div`
    width: 100%;
    max-width: 700px;
    padding: 35px;
    border-radius: 15px;
    ${BoxShadow};
    ${Column};
    gap: 15px;
    background-color: ${theme.colors.lightGray};
`

export const CardHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`

export const CardUserName = styled.p`
    ${Font({size: '14px', weight: '600', line: '17px', color: theme.colors.regularDark})};
    cursor: pointer;
`

export const CardText = styled.p`
    ${Font({size: '11px', weight: '400', line: '15px', color: theme.colors.darkGray})};
`

export const UserDataContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`

export const CardImage = styled.img`
    width: 200px;

`