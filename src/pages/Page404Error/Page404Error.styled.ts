import { styled } from 'styled-components';
import { device } from '@styles/Breakpoints';
import { Column, Size } from '@styles/mixins';


export const Image = styled.img`
    ${Size({w: '250px'})};


    @media ${device.sm} {
        ${Size({w: '300px'})};
    };

    @media ${device.xl} {
        ${Size({w: '350px'})};
    };
`

export const Container = styled.div`
    ${Column};
    gap: 30px;
    text-align: center;
`