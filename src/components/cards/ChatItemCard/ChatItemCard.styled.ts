import { styled } from "styled-components";
import { BoxShadow, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Link } from "react-router-dom";


export const ChatCard = styled(Link)`
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
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors.lightRose};
    }
    &:active {
        background-color: ${theme.colors.regularLight};
    }
`

export const CardContent = styled.div`
    display:flex;
    align-items: center;
    gap: 10px;
`


export const MessageInfo = styled.div`
    display:flex;
    flex-direction: column;
    gap: 5px;
`

export const UserName = styled.p`
    ${Font({size: '14px', weight: '600', line: '17px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const MessageText = styled.p`
    ${Font({size: '11px', line: '13px', color: theme.colors.mediumGray})};
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-image: linear-gradient(90deg, #5a5858 0%, #dcdcdc 89%);
`

