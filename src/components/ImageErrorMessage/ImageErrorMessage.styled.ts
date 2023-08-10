import { styled } from "styled-components";
import { device } from '@styles/Breakpoints';
import { Column, Size } from "@styles/mixins";


export const Container = styled.div`
    ${Column};
    gap: 10px;
    max-width: 500px;
    text-align: center;
`

export const Image = styled.img`
    ${Size({w: '100px'})};

    @media ${device.sm} {
        ${Size({w: '150px'})};
    };

    @media ${device.xl} {
        ${Size({w: '200px'})};
    };
`
