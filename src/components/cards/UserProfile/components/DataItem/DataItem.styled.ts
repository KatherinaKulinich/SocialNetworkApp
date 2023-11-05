import { styled } from "styled-components";
import { theme } from "@styles/Theme";

export const Field = styled.div<{$direction: string}>`
    display: flex;
    gap: 16px;
    align-items: center;
    flex-direction: ${props => props.$direction === 'column' ? 'column' : 'row'};
    text-align: center;
`

export const Subtitle = styled.p`
    text-transform: uppercase;
    font-size: 18px;
    line-height: 20px;
    color:  ${theme.colors.textColor};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
`

export const RegularText = styled(Subtitle)`
    white-space: wrap;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    text-transform: initial;
    max-width: 600px;

`

export const ItemValue = styled.div`
    white-space: wrap;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    max-width: 600px;
    display: flex;
    align-items: center;
    gap: 12px;
    color:  ${theme.colors.textColor};
`

