import { styled } from "styled-components";
import { theme } from "@styles/Theme";
import { device } from "@styles/Breakpoints";
import { Font } from "@styles/mixins";



export const Field = styled.div<{$direction: string}>`
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: ${props => props.$direction === 'column' ? 'column' : 'row'};
    text-align: center;

    @media ${device.sm} {
        gap: 14px;
    };
`

export const Subtitle = styled.p`
    text-transform: uppercase;
    ${Font({size: '12px', weight: '600', line: '20px', color: theme.colors.textColor})};
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;

    @media ${device.sm} {
        gap: 10px;
        font-size: 14px;
    };
    @media ${device.xl} {
        gap: 12px;
        font-size: 18px;
    };
`

export const RegularText = styled(Subtitle)`
    white-space: wrap;
    ${Font({size: '12px', weight: '300', line: '16px', color: theme.colors.textColor})};
    text-transform: initial;
    max-width: 600px;

    @media ${device.sm} {
        font-size: 14px;
    };

`

export const ItemValue = styled.div`
    white-space: wrap;
    ${Font({size: '11px', weight: '300', line: '17px', color: theme.colors.textColor})};
    max-width: 600px;
    display: flex;
    align-items: center;
    gap: 12px;

    @media ${device.sm} {
        font-size: 14px;
    };
`

