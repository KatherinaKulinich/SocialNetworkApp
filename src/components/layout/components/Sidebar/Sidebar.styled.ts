import styled from 'styled-components';
import { theme } from '@styles/Theme'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const SidebarSection = styled.section`
    padding: 20px;
    height: calc(100vh - 160px);
    width: 280px;
    background-color: ${theme.colors.mediumGray};
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
    position: fixed;
    overflow-x: none;
    z-index:90;
`
