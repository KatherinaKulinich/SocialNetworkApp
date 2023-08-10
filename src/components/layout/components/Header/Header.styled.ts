import styled from 'styled-components';
import { theme } from '@styles/Theme';
import { Font } from '@styles/mixins';

export const HeaderSection = styled.header`
    width: 100%;
    background-color: ${theme.colors.regular};
    position:fixed;
    top: 0;
    right:0;
    left:0;
    z-index: 100;
    padding: 0 15px;
`

export const HeaderContainer = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const HeaderText = styled.p`
    ${Font({size: '14px', line: '17px', weight: '600', color: '#FFFFFF'})};
    text-transform: uppercase;
`

