import { styled } from "styled-components";
import { BoxShadow, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";


export const ChatCard = styled.div<{$new:boolean}>`
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
    position:relative;
    border: ${props => props.$new === true ? `2px solid ${theme.colors.regular}` : ''} ;

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
    ${Font({size: '11px', weight: '600', line: '15px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    @media ${device.sm} {
        font-size: 12px;
        line-height: 17px;
    };
`

export const MessageText = styled.p`
    ${Font({size: '8px', line: '11px', color: theme.colors.mediumGray})};
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-image: linear-gradient(90deg, #5a5858 20%, #dcdcdc 90%);

    @media ${device.sm} {
        font-size: 9px;
        line-height: 13px;
    };
`

export const Badge = styled.div`
    padding: 2px 6px;
    border-radius: 15px;
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${theme.colors.regular};
`

export const BadgeText = styled.p`
    ${Font({size: '9px', line: '9px', color: 'white'})};
`


