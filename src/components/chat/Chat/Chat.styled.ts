import styled from 'styled-components';
import { device } from "@styles/Breakpoints";
import { theme } from '@styles/Theme';
import { AbsoluteCenter, FlexCenter, Font, FullSize } from '@styles/mixins';

export const Container = styled.div`
    width:100%;
    min-height:100%;
    position:relative;
    border-right: 1px solid ${theme.colors.lightGray};
`
export const ContainerBackground = styled.div<{$url: string}>`
    height:calc(100vh - 320px);
    height: 100%;
    position: relative;
    background-color: #fff9f9;
    background-image: url(${props => props.$url});
    background-size: cover;

    &::after {
        content: '';
        position: absolute;
        top:0;
        right:0;
        bottom:70%;
        left:0;
        z-index: 30;
        background:linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .4) 51%, rgba(255, 255, 255, .6) 80%, rgba(255, 255, 255, .8) 100%);
    }

    @media ${device.sm} {       
        height:calc(100vh - 320px);
    };
    @media ${device.md} {       
        height:calc(100vh - 344px);
    };
`

export const MessagesContainer = styled.div<{$isUserTyping: boolean}>`
    padding: 7px 10px ;
    ${FullSize};
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    overflow-x:auto;
    z-index:10;
    padding-bottom: ${props => props.$isUserTyping === true ? '25px' : '7px'};

    @media ${device.sm} {       
        padding: 15px 22px ;
        gap: 12px;
        padding-bottom: ${props => props.$isUserTyping === true ? '40px' : '15px'};
    };
`


export const MessageRow = styled.div<{$sender: string}>`
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$sender === 'me' ? 'end' : 'start'};

    &:last-child {
        margin-bottom: 50px;
    }
`

export const EmptyChatMessage = styled.div`
    padding: 15px;
    max-width: 500px;
    min-width: 250px;
    position:absolute;
    ${AbsoluteCenter};
    background-color: rgba(255, 255, 255, .7);
    border-radius: 20px;
    ${FlexCenter};
    flex-direction: column;
    gap: 15px;
    text-align: center;

    @media ${device.sm}  {
        padding: 20px;
        gap: 25px;
    }
`
export const Text = styled.p`
    ${Font({size: '11px', line: '14px', color: theme.colors.regularDark})};

    @media ${device.sm}  {
        font-size: 14px;
        line-height: 17px;
    }
`

