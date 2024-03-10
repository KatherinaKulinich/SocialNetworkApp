import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { Font } from "@styles/mixins";
import { Link } from "react-router-dom";


export const Container = styled.div`
    width: 100%;
    padding: 7px 30px;
    background-color: #FFFFFF;
    border-bottom: 1px solid ${theme.colors.lightGray};
    display: flex;
    align-items: center;
    gap: 100px;
    cursor: pointer;
`

export const UserInfo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
`

export const Name = styled.p`
    ${Font({size: '14px',weight: '500', line: '17px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`