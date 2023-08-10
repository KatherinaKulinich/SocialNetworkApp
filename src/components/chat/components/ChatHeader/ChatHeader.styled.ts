import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { Font } from "@styles/mixins";


export const Container = styled.div`
    width: 100%;
    padding: 7px 30px;
    background-color: #FFFFFF;
    border-bottom: 1px solid ${theme.colors.lightGray};
    display: flex;
    align-items: center;
    gap: 20px;
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

export const Name = styled.p`
    ${Font({size: '12px',weight: '500', line: '15px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`