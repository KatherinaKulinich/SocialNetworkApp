import { styled } from "styled-components";
import { BoxShadow, Font } from "@styles/mixins";
import { theme } from "@styles/Theme";
import { Image } from "antd";


export const Container = styled.div<{$sender: string}>`
    width: 300px;
    display: flex;
    flex-direction: ${props => props.$sender === 'me' ? 'row' : 'row-reverse'};
    align-items: flex-end;
    justify-content:  ${props => props.$sender === 'me' ? 'end' : 'start'};
    gap: 10px;
`

export const TextBubble = styled.div<{$sender: string}>`
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    background-color: rgba(255, 255, 255, .8);
    ${BoxShadow};
    border-radius: ${props => props.$sender === 'me' ? '14px 14px 0 14px' : '14px 14px 14px 0'}; 
`

export const SenderName = styled.p`
    ${Font({size: '12px',weight: '600', line: '15px', color: theme.colors.regularDark})};
    text-transform: uppercase;
`

export const Text = styled.p`
    ${Font({size: '11px', line: '13px', color: theme.colors.textColor})};
`


export const Time = styled(Text)`
    font-size: 10px;
    font-weight: 600;
    color: ${theme.colors.mediumGray};
`

export const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap:2px;
`

export const ImageBox = styled(Image)`
    object-fit: cover;
    width: 100px;
    border-radius: 10px;
`