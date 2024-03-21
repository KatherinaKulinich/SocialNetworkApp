import styled from 'styled-components';
import { device } from '@styles/Breakpoints'
import { FullSize } from '@styles/mixins'


export const PageContainer = styled.div`
    width: 100%;
    height: 100vh ;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 58px 1fr 55px;
    position: relative;

    @media ${device.md} {
        grid-template-rows: 58px 1fr 71px;
    };
`

export const MainContent = styled.main`
    ${FullSize};

    @media ${device.md} {
        background: linear-gradient(90deg, #8d8d8d 25%, #fff 62%);
    };
`
export const MainContentGrid = styled.div`
    ${FullSize};
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr;

    @media ${device.md} {
        grid-template-columns: 280px 1fr;
    };
`


export const GridItem = styled.section<{$column?: string, $row?: string}>`
    grid-column: ${props => props.$column};
    grid-row: ${props => props.$row};
    ${FullSize};
`

export const Content = styled.div`
    ${FullSize};
    background: #FFFFFF;
    overflow-y: auto;
`
