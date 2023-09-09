import { styled } from "styled-components";
import { BoxShadow, Column, FlexCenter, Font, Size } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Link } from "react-router-dom";



export const Card = styled.div`
    padding: 15px;
    width: 180px;
    border-radius: 15px;
    background-color: ${theme.colors.lightGray};
    ${Column};
    justify-content: space-between;
    gap: 20px;
    ${BoxShadow};
    height:initial;
`


export const ActionsContainer = styled.div`
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-between;
`

export const ActionLink = styled(Link)`
    ${Font({size: '16px', weight: '800', line: '18px', color: theme.colors.regularDark})};
    text-transform: uppercase;
    text-decoration:none;

    &:hover {
        color: ${theme.colors.regular};
    }
`

export const Name = styled.h3`
    ${Font({size: '16px', line: '19px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const PersonalInfo = styled.div`
    ${Column};
    gap: 7px;
    text-align: center;
`

export const Text = styled.p`
    ${Font({size: '13px', line: '15px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
`