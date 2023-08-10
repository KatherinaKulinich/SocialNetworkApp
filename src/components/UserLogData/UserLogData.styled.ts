import styled from 'styled-components';
import { theme } from '@styles/Theme'
import { Font } from '@styles/mixins';




export const Container = styled.div`
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid ${theme.colors.lightGray};
    border-top: 1px solid ${theme.colors.lightGray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`


export const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

export const Text = styled.p`
    ${Font({size: '13px', line: '16px', color: theme.colors.lightGray})};
    text-transform: uppercase;
`