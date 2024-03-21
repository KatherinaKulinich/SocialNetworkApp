import styled from 'styled-components';
import { theme } from '@styles/Theme'
import { Column } from '@styles/mixins';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const SidebarSection = styled.section`
    padding: 15px;
    height: calc(100vh - 129px);
    width: 280px;
    background-color: ${theme.colors.mediumGray};
    display:flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;

    /* display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto; */
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
    position: fixed;
    overflow-x: none;
    z-index:90;
`
