import { styled } from "styled-components";
import { device } from '@styles/Breakpoints';
import { Column, Size } from "@styles/mixins";
import { theme } from "@styles/Theme";


export const Container = styled.div`
    ${Column};
    gap: 10px;
    max-width: 500px;
    text-align: center;
`

export const Image = styled.img`
    ${Size({w: '100px'})};

    @media ${device.sm} {
        ${Size({w: '140px'})};
    };

    @media ${device.xl} {
        ${Size({w: '180px'})};
    };
`

export const Text = styled.p`
    text-transform: uppercase;
    font-size: 12px;
    line-height: 15px;
    font-weight: 400;
    color: ${theme.colors.mediumGray};
    letter-spacing: 1px;

    @media ${device.sm} {
        font-size: 14px;
        line-height: 18px;
    };
    
    @media ${device.xl} {
        font-size: 17px;
        line-height: 22px;
    };
`
