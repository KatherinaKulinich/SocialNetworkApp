import styled from 'styled-components';
import {device} from '@styles/Breakpoints';
import { Column } from '@styles/mixins';



export const Image = styled.img`
    width: 120px;

    @media ${device.sm} {
        width: 200px;
    };
    @media ${device.lg} {
        width: 300px;
    };
`

export const Container = styled.div<{$gap: string}>`
    max-width: 600px;
    ${Column}
    gap: ${props => props.$gap};
    text-align: center;
`