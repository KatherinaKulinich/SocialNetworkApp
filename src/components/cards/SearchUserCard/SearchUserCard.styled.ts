import { styled } from "styled-components";
import { BoxShadow,Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Link } from "react-router-dom";


export const UserCard = styled(Link)`
    padding: 10px 20px;
    display: block;
    text-decoration: none;
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .2);
    ${BoxShadow};
    display:flex;
    align-items: center;
    justify-content: space-between;
    /* gap: 20px; */
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.lightRose};
    }
    &:active {
        background-color: ${theme.colors.regularLight};
    }
`

export const Flex = styled.div`
    display:flex;
    align-items: center;
    gap: 5px;
`
export const CardContent = styled(Flex)`
    gap: 15px;
    
`
export const UserInfo = styled.div`
    display:flex;
    flex-direction: column;
    gap: 11px;
    max-width: 200px;
`

export const UserName = styled.p`
    ${Font({size: '14px', weight: '600', line: '17px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const Text = styled.p`
    ${Font({size: '11px', line: '13px', color: theme.colors.mediumGray})};
    text-transform: uppercase;
`