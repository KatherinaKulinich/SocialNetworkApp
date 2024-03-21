import { styled } from "styled-components";
import { BoxShadow, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Image } from "antd";
import { device } from "@styles/Breakpoints";


export const Container = styled.div<{$sender: string}>`
    max-width: 300px;
    display: flex;
    flex-direction: ${props => props.$sender === 'me' ? 'row' : 'row-reverse'};
    align-items: flex-end;
    justify-content:  ${props => props.$sender === 'me' ? 'end' : 'start'};
    gap: 10px;
`

export const TextBubble = styled.div<{$sender: string}>`
    width: inherit;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: rgba(255, 255, 255, .8);
    ${BoxShadow};
    border-radius: ${props => props.$sender === 'me' ? '14px 14px 0 14px' : '14px 14px 14px 0'}; 
`

export const SenderName = styled.p`
    ${Font({size: '9px',weight: '600', line: '11px', color: theme.colors.regularDark})};
    text-transform: uppercase;

    /* @media ${device.sm} {
        font-size: 9px;
        line-height: 13px;
    } */
`

export const Text = styled.p`
    ${Font({size: '8px', line: '11px', color: theme.colors.textColor})};

    @media ${device.sm} {
        font-size: 10px;
        line-height: 13px;
    }
`


export const Time = styled(Text)`
    font-size: 9px;
    font-weight: 500;
    color: ${theme.colors.mediumGray};
`

export const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2px;
`

export const ImageBox = styled(Image)`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`