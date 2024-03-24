import styled from 'styled-components';
import { theme } from '@styles/Theme'
import { device } from "@styles/Breakpoints";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media ${device.sm} {
        gap: 30px;
    }
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
    border-left: 1px solid ${theme.colors.lightGray};
    border-right: 1px solid ${theme.colors.lightGray};
    position: fixed;
    overflow-x: none;
    z-index:90;
`
export const ButtonBox = styled.div`
    align-self: center;
`