import styled from 'styled-components';
import { FlexCenter, FullSize } from '@styles/mixins';

export const Container = styled.div`
    ${FullSize};
    min-height: 100vh;
    ${FlexCenter};
    justify-content: space-between;
`

export const MainContent = styled.main`
    width: 100%;
    position: absolute;
    top: 70px;
    bottom: 90px;
    overflow-y: auto;
`