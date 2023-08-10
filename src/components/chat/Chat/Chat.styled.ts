import styled from 'styled-components';
import { device } from "@styles/Breakpoints";
import { AbsoluteCenter, FlexCenter, Font, FullSize } from '@styles/mixins';
import { theme } from '@styles/Theme';

export const Container = styled.div`
    width:100%;
    min-height:100%;
    position:relative;
`
export const ContainerBackground = styled.div<{$url: string}>`
    height:calc(100vh - 334px);
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
        height:calc(100vh - 396px);
    };
    @media ${device.md} {       
        height:calc(100vh - 434px);
    };
`

export const MessagesContainer = styled.div`
    padding: 15px 30px ;
    ${FullSize};
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;
    gap: 15px;
    overflow-x:auto;
    z-index:10;
`
export const MessageRow = styled.div<{$sender: string}>`
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: ${props => props.$sender === 'me' ? 'end' : 'start'};
`

export const EmptyChatMessage = styled.div`
    padding: 20px;
    max-width: 500px;
    min-width: 220px;
    position:absolute;
    ${AbsoluteCenter};
    background-color: rgba(255, 255, 255, .7);
    border-radius: 20px;
    ${FlexCenter};
    gap: 15px;
    text-align: center;
`
export const Text = styled.p`
    ${Font({size: '18px', line: '21px', color: theme.colors.regularDark})};
`

